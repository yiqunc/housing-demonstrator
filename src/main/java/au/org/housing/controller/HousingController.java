package au.org.housing.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import au.org.housing.exception.Messages;
import au.org.housing.service.DevelopmentNewService;
import au.org.housing.service.DevelopmentPotentialService;
import au.org.housing.service.DevelpmentAssessmentService;
import au.org.housing.service.FacilitiesBufferService;
import au.org.housing.service.InitDevelopAssessment;
import au.org.housing.service.InitDevelopNew;
import au.org.housing.service.InitDevelopPotential;
import au.org.housing.service.PostGISService;
import au.org.housing.service.TransportationBufferService;

import com.vividsolutions.jts.geom.Geometry;

/**
 * The main controller of the system, responsible for performing any requested
 * analysis
 * 
 * @author Gh.Karami
 * @version 1.0
 * 
 */

@Controller
@RequestMapping("/housing-controller")
public class HousingController {
  // private static final Logger LOGGER =
  // LoggerFactory.getLogger(HousingController.class);

  @Autowired
  private TransportationBufferService transportationBufferService;

  @Autowired
  private PostGISService posGISService;

  @Autowired
  private FacilitiesBufferService facilitiesBufferService;

  @Autowired
  private DevelopmentPotentialService developmentPotentialService;

  @Autowired
  public InitDevelopPotential initService;

  @Autowired
  public InitDevelopAssessment initDevelopAssessment;

  @Autowired
  public DevelpmentAssessmentService developAssessment;

  @Autowired
  public InitDevelopNew initNew;

  @Autowired
  public DevelopmentNewService developNewService;

  // ////////////////////////////////////////////////////////////////////////
  private class ProgressDetails {
    // class variables
    private String taskId;
    private int total = 0;
    private int totalProcessed = 0;

    private String step = "start";

    // field setters
    public void setTaskId(String taskId) {
      this.taskId = taskId;
    }

    public String getStep() {
      return step;
    }

    public void setStep(String step) {
      this.step = step;
    }

    public void setTotal(int total) {
      this.total = total;
    }

    public void setTotalProcessed(int totalProcessed) {
      this.totalProcessed = totalProcessed;
    }

    // toString() method which returns progress details in JSON format
    @Override
    public String toString() {
      return "{total:" + this.total + ",totalProcessed:" + this.totalProcessed
          + "}";
    }

    // a public static HashMap, which serves as a storage to store progress of
    // different tasks
    // with taskId as key and ProgressDetails object as value
    public HashMap<String, ProgressDetails> taskProgressHash = new HashMap<String, ProgressDetails>();

  }

  @RequestMapping(method = RequestMethod.POST, value = "/ProgressMonitor", headers = "Content-Type=application/json")
  public @ResponseBody
  Map<String, Object> progressMonitor1(
      @RequestBody Map<String, Object> potentialParams,
      HttpServletRequest request, HttpServletResponse response,
      HttpSession session) throws Exception {
    Map<String, Object> responseMap = new HashMap<String, Object>();

    // read the tadkId;
    String taskId = (String) potentialParams.get("taskIdentity");
    // get the progres of this task
    ProgressDetails taskProgress = new ProgressDetails();
    taskProgress.taskProgressHash.get(taskId);
    responseMap.put("totalProcessed", 10);

    responseMap.put("step", developmentPotentialService.getStep());
    return responseMap;
  }

  // ////////////////////////////////////////////////////////////////////////

  @RequestMapping(method = RequestMethod.POST, value = "/developmentPotential", headers = "Content-Type=application/json")
  @ResponseStatus(HttpStatus.OK)
  @ExceptionHandler
  public @ResponseBody
  Map<String, Object> handleRequest(
      @RequestBody Map<String, Object> potentialParams,
      HttpServletRequest request, HttpServletResponse response,
      HttpSession session, Principal principal) throws Exception {

    // // read the tadkId;
    // String taskId = (String) potentialParams.get("taskIdentity");
    // // some stuff here
    // // some more stuff
    //
    // // create an object of ProgressDetails and set the total items to be
    // processed
    // ProgressDetails taskProgress = new ProgressDetails();
    // taskProgress.setTotal(1000);
    //
    // // store the taskProgress object using taskId as key
    // taskProgress.taskProgressHash.put(taskId, taskProgress);
    //
    // // for each record to be processed
    // for ( int i=0; i < 1000; i++){
    // // do the processing for this record
    // // ...
    // // ...
    //
    // // update the progress
    // taskProgress.taskProgressHash.get(taskId).setTotalProcessed(i);
    //
    // }

    String username = principal.getName();
    Map<String, Object> responseMap = new HashMap<String, Object>();
    responseMap.put("message", Messages._SUCCESSFULLY_DONE);
    responseMap.put("successStatus", Messages._SUCCESS);
    try {
      initService.initParams(potentialParams);

      Geometry transportGeometry = transportationBufferService
          .generateTranportBuffer();

      Geometry facilitiesGeometry = facilitiesBufferService
          .generateFacilityBuffer();
      if (transportGeometry != null && facilitiesGeometry != null) {
        developmentPotentialService.setBufferAllParams(transportGeometry
            .intersection(facilitiesGeometry));
      } else if (transportGeometry != null && facilitiesGeometry == null) {
        developmentPotentialService.setBufferAllParams(transportGeometry);
      } else if (transportGeometry == null && facilitiesGeometry != null) {
        developmentPotentialService.setBufferAllParams(facilitiesGeometry);
      }
  
      developmentPotentialService.analyse(username, session);
    } catch (Exception e) {
      e.printStackTrace();
      responseMap.put("successStatus", Messages._UNSUCCESS);
      responseMap.put("message", e.getMessage());
    }
    request.getSession().setMaxInactiveInterval(60 * 60);
    developmentPotentialService.setStep("");
    return responseMap;
  }

  @RequestMapping(method = RequestMethod.POST, value = "/developmentAssessment", consumes = "application/json")
  @ResponseStatus(HttpStatus.OK)
  @ExceptionHandler
  public @ResponseBody
  Map<String, Object> developmentAssessment(
      @RequestBody Map<String, Object> assessmentParams,
      HttpServletRequest request, HttpServletResponse response,
      HttpSession session, Principal principal) throws Exception {
    Map<String, Object> responseMap = new HashMap<String, Object>();

    if (!request.isRequestedSessionIdFromCookie()) {
      System.out.println("isRequestedSessionIdValid");
    }

    if (request.getUserPrincipal() == null) {
      System.out.println("nullll");
      responseMap.put("successStatus", Messages._INVALIDATE);
      responseMap.put("message", "this User is Logged in on another system");
      return responseMap;
    }

    String username = principal.getName();
    responseMap.put("message", Messages._SUCCESSFULLY_DONE);
    responseMap.put("successStatus", Messages._SUCCESS);
    try {
      initDevelopAssessment.initParams(assessmentParams);
      developAssessment.analyse(username, session);
    } catch (Exception e) {
      // LOGGER.info(e.getMessage());
      responseMap.put("successStatus", Messages._UNSUCCESS);
      responseMap.put("message", e.getMessage());
    }
    request.getSession().setMaxInactiveInterval(60 * 60);
    return responseMap;
  }

  // ali
  @RequestMapping(method = RequestMethod.POST, value = "/developmentNew", headers = "Content-Type=application/json")
  @ResponseStatus(HttpStatus.OK)
  @ExceptionHandler
  public @ResponseBody
  Map<String, Object> handleRequestNew(
      @RequestBody Map<String, Object> NewParams, HttpServletRequest request,
      HttpServletResponse response, HttpSession session, Principal principal)
      throws Exception {

    String username = principal.getName();
    Map<String, Object> responseMap = new HashMap<String, Object>();
    responseMap.put("message", Messages._SUCCESSFULLY_DONE);
    responseMap.put("successStatus", Messages._SUCCESS);
    try {
      initNew.initParams(NewParams);
      developNewService.analyse(username, session);
    } catch (Exception e) {
      e.printStackTrace();
      responseMap.put("successStatus", Messages._UNSUCCESS);
      responseMap.put("message", e.getMessage());
    }
    request.getSession().setMaxInactiveInterval(60 * 60);
    developNewService.setStep("");
    return responseMap;
  }

  @RequestMapping(method = RequestMethod.GET, value = "/map_new")
  public @ResponseBody
  Map<String, Object> mapNew(HttpSession session) throws Exception {

    return developNewService.getOutputLayer();
  }

  @RequestMapping(method = RequestMethod.GET, value = "/map_new_chart")
  public @ResponseBody
  String mapNewchart(HttpSession session) throws Exception {

    // return developNewService.getJson();
    return developNewService.getJsonChart();
  }

  @RequestMapping(method = RequestMethod.GET, value = "/map_new_table")
  public @ResponseBody
  String mapNewtable(HttpSession session) throws Exception {

    // return developNewService.getJson();
    return developNewService.getJson();
  }

  // @RequestMapping(value = "/", method = RequestMethod.GET,
  // headers={"Accept=text/plain,appliction/json"})
  @RequestMapping(value = "/table.csv", method = RequestMethod.GET, headers = { "Accept=text/csv" })
  @ResponseBody
  public String jsonOutput() {
    return developNewService.getTable();
  }

  // developmentNewTable
  @RequestMapping(method = RequestMethod.POST, value = "/developmentNewTable", headers = "Content-Type=application/json")
  @ResponseStatus(HttpStatus.OK)
  @ExceptionHandler
  public @ResponseBody
  Map<String, Object> handleRequestNewTable(
      @RequestBody Map<String, Object> NewParams, HttpServletRequest request,
      HttpServletResponse response, HttpSession session, Principal principal)
      throws Exception {

    String username = principal.getName();
    Map<String, Object> responseMap = new HashMap<String, Object>();
    responseMap.put("message", Messages._SUCCESSFULLY_DONE);
    responseMap.put("successStatus", Messages._SUCCESS);
    try {
      initNew.initParamsCheks(NewParams);
      developNewService.analyseTable(username, session);
    } catch (Exception e) {
      e.printStackTrace();
      responseMap.put("successStatus", Messages._UNSUCCESS);
      responseMap.put("message", e.getMessage());
    }
    request.getSession().setMaxInactiveInterval(60 * 60);
    developNewService.setStep("");
    return responseMap;
  }

  // end ali

  @RequestMapping(method = RequestMethod.GET, value = "/map_assessment")
  public @ResponseBody
  Map<String, Object> mapAssessment(HttpSession session) throws Exception {

    // Map<String, Object> potentialParams =
    // developmentPotentialService.getOutputLayer();
    // System.out.println("layeName ="+ );
    // System.out.println("max x ="+ potentialParams.);
    // System.out.println("max y ="+ );
    // System.out.println("min x ="+ );
    // System.out.println("min y ="+ );
    return developAssessment.getOutputLayer();
  }

  @RequestMapping(method = RequestMethod.GET, value = "/map_potential")
  public @ResponseBody
  Map<String, Object> mapPotential(HttpSession session) throws Exception {
    // Map<String, Object> potentialParams = new HashMap<String, Object>();
    // potentialParams.put("workspace",
    // propertyFilterService.getGeoServerConfig().getGsWorkspace());
    // potentialParams.put("layerName", propertyFilterService.getLayerName());
    // potentialParams.put("maxX",
    // propertyFilterService.getEnvelope().getMaxX());
    // potentialParams.put("minX",
    // propertyFilterService.getEnvelope().getMinX());
    // potentialParams.put("maxY",
    // propertyFilterService.getEnvelope().getMaxY());
    // potentialParams.put("minY",
    // propertyFilterService.getEnvelope().getMinY());
    // // Map<String, Object> assessmentParams = new HashMap<String, Object>();
    // // assessmentParams.putAll(developAssessment.getOutputLayer());
    // // System.out.println(assessmentParams.get("layerName"));
    // //
    // System.out.println("outputLayer.get(maxX)  222 === "+assessmentParams.get("maxX"));
    // return potentialParams;

    // Map<String, Object> test;
    // test = developmentPotentialService.getOutputLayer();
    // System.out.println(test.toString());
    return developmentPotentialService.getOutputLayer();
  }
  
  @RequestMapping(value = "/download", method = RequestMethod.GET)
  public void downloadGeneratedOutput(HttpServletRequest request,HttpServletResponse response){
	  synchronized (request.getSession()) {	

		  String layername = request.getParameter("layername");
		  String zipfilepath = request.getSession().getServletContext().getRealPath(".")+File.separator+"download"+File.separator+request.getSession().getId()+File.separator+layername+File.separator+layername+".zip";
		  File file = new File(zipfilepath); 
		  response.setContentType("application/x-download");
		  response.setHeader("Content-disposition", "attachment; filename=" + layername + ".zip");
		  try {
			FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	  }
  }
  
  // call this method from /housing/housing-controller/clearAllOutputs to delete the output folders to save disk space 
  @RequestMapping(value = "/clearAllOutputs", method = RequestMethod.GET)
  public void clearAllOutputs(HttpServletRequest request,HttpServletResponse response){
	
		  String downloadDir = request.getSession().getServletContext().getRealPath(".")+File.separator+"download";
		  File file = new File(downloadDir);
		  if(file.exists()){try {
			  	
				FileUtils.deleteDirectory(file);
				response.setContentType("text/html;charset=UTF-8"); 

				  ServletOutputStream out = response.getOutputStream(); 

				  out.println("done! download dir '"+downloadDir+"' is cleaned."); 
				  
				  out.close(); 
				  
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}}

  }

}
