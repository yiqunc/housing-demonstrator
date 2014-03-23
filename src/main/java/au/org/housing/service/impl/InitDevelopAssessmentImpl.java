package au.org.housing.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import au.org.housing.model.ParameterDevelopAssessment;
import au.org.housing.service.InitDevelopAssessment;

/**
 * Implementation for initializing ParameterDevelopAssessment
 * model based on the selected parameters by user and to be used
 * in other handler services.
 *
 * @author Gh.Karami
 * @version 1.0
 *
 */ 

@Service
public class InitDevelopAssessmentImpl implements InitDevelopAssessment {

	@Autowired
	private ParameterDevelopAssessment parameter;		

	public void initParams(Map<String, Object> params) {	

		parameter.setSelectedLGAs2((List<String>)params.get("selectedLGAs2"));
		System.out.println("selected LGAs=="+ parameter.getSelectedLGAs2());

		parameter.setDurationAssessmentOperateor((String) params.get("durationAssessmentOperateorVal"));  
		parameter.setDurationAssessment((Integer) params.get("durationAssessmentVal"));  

		parameter.setNumOfObjectionOperateor((String) params.get("numOfObjectionOperateorVal"));  
		parameter.setNumOfObjection((Integer) params.get("numOfObjectionVal"));  

		System.out.println(parameter.getNumOfObjectionOperateor());
		System.out.println(parameter.getNumOfObjection());

		if ((Boolean) params.get("furtherInfoVal")){
			parameter.setFurtherInfo(2);
		}
		if ((Boolean) params.get("publicNoticeVal")){
			parameter.setPublicNotice(2);
		}
		if ((Boolean) params.get("referralIssuesVal")){
			parameter.setReferralIssues(2);
		}				
		parameter.setSelectedCategories((List<Integer>) params.get("selectedCategories"));

		parameter.setNumOfDwellingOperateor((String) params.get("numOfDwellingOperateorVal"));  
		parameter.setNumOfDwelling((Integer) params.get("numOfDwellingVal"));  

		if ((Boolean) params.get("fromResidentialVal").equals(Boolean.TRUE)){
			parameter.setCurrentUse(7);
		}else if ((Boolean) params.get("fromOtherUsesVal").equals(Boolean.TRUE)){
			parameter.setCurrentUse(-7);
		}else{
			parameter.setCurrentUse(-1);
		}
		if ((Boolean) params.get("toResidentialVal").equals(Boolean.TRUE)){
			parameter.setProposedUse(7);
		}else if ((Boolean) params.get("toOtherUsesVal").equals(Boolean.TRUE)){
			parameter.setProposedUse(-7);
		}else{
			parameter.setProposedUse(-1);
		}
		parameter.setEstimatedCostOfWorkOperateor((String) params.get("estimatedCostOfWorkOperateorVal"));  
		parameter.setEstimatedCostOfWork((Integer) params.get("estimatedCostOfWorkVal"));

		if ((Boolean) params.get("preMeetingVal")){
			parameter.setPreMeeting(2);
		}
		parameter.setSelectedOutcome((Integer) params.get("selectedOutcome"));
	}
}
