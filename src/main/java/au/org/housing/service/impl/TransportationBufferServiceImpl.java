package au.org.housing.service.impl;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;

import org.geotools.data.simple.SimpleFeatureSource;
import org.opengis.referencing.FactoryException;
import org.opengis.referencing.NoSuchAuthorityCodeException;
import org.postgresql.util.PSQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import au.org.housing.config.InputLayersConfig;
import au.org.housing.exception.HousingException;

import au.org.housing.model.ParameterDevelopPotential;
import au.org.housing.service.BufferService;
import au.org.housing.service.PostGISService;
import au.org.housing.service.TransportationBufferService;
import au.org.housing.service.UnionService;
import au.org.housing.service.ValidationService;

import com.vividsolutions.jts.geom.Geometry;

/**
 * Implementation for generating buffer for Transportation 
 * DataSets based on the selected parameters by user.
 * At first a buffer is generated based on the distance 
 * parameter for every Transportation DataSet selected, and at 
 * the end, the Union of all these Transportations will
 * be calculated.
 *
 * @author Gh.Karami
 * @version 1.0
 *
 */

@Service
public class TransportationBufferServiceImpl implements
TransportationBufferService {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(TransportationBufferServiceImpl.class);

	@Autowired
	private ParameterDevelopPotential parameter;

	@Autowired
	private PostGISService postGISService;

	@Autowired
	private BufferService bufferService;

	@Autowired
	private UnionService unionService;

	@Autowired
	private ValidationService validationService;

	@Autowired
	private InputLayersConfig layerMapping;

	SimpleFeatureSource trainStationFc;
	SimpleFeatureSource trainRouteFc;
	SimpleFeatureSource tramRouteFc;
	SimpleFeatureSource busRouteFc;

	Collection<Geometry> trasportationbufferCollection;

	public Geometry generateTranportBuffer()
			throws NoSuchAuthorityCodeException, IOException, FactoryException,
			URISyntaxException, PSQLException, HousingException {

		trasportationbufferCollection = new ArrayList<Geometry>();

		if (parameter.getTrain_St_BufferDistance() != 0) {
			trainStationFc = postGISService.getFeatureSource(
					layerMapping.getTrainStation());
			if (validationService.isPoint(trainStationFc,
					layerMapping.getTrainStation())
					&& validationService.isMetric(trainStationFc,
							layerMapping.getTrainStation())) {
				Collection<Geometry> bufferCollection = bufferService
						.createFeaturesBuffer(trainStationFc.getFeatures(),
								parameter.getTrain_St_BufferDistance(),
								layerMapping.getTrainStation());
				if (bufferCollection != null) {
					trasportationbufferCollection.addAll(bufferCollection);
				}
			}
		}
		if (parameter.getTrain_Rt_BufferDistance() != 0) {
			trainRouteFc = postGISService.getFeatureSource(
					layerMapping.getTrainRoute());
			if (validationService.isLine(trainRouteFc,
					layerMapping.getTrainRoute())
					&& validationService.isMetric(trainRouteFc,
							layerMapping.getTrainRoute())) {
				Collection<Geometry> bufferCollection = bufferService
						.createFeaturesBuffer(trainRouteFc.getFeatures(),
								parameter.getTrain_Rt_BufferDistance(),
								layerMapping.getTrainRoute());
				if (bufferCollection != null) {
					trasportationbufferCollection.addAll(bufferCollection);
				}
			}
		}
		if (parameter.getTram_Rt_BufferDistance() != 0) {
			tramRouteFc = postGISService.getFeatureSource(
					layerMapping.getTramRoute());
			if (validationService.isLine(tramRouteFc,
					layerMapping.getTramRoute())
					&& validationService.isMetric(tramRouteFc,
							layerMapping.getTramRoute())) {
				Collection<Geometry> bufferCollection = bufferService
						.createFeaturesBuffer(tramRouteFc.getFeatures(),
								parameter.getTram_Rt_BufferDistance(),
								layerMapping.getTramRoute());
				if (bufferCollection != null) {
					trasportationbufferCollection.addAll(bufferCollection);
				}
			}
		}
		if (parameter.getBus_Rt_BufferDistance() != 0) {
			busRouteFc = postGISService.getFeatureSource(
					layerMapping.getBusRoute());
			if (validationService.isLine(busRouteFc,
					layerMapping.getBusRoute())
					&& validationService.isMetric(busRouteFc,
							layerMapping.getBusRoute())) {
				Collection<Geometry> bufferCollection = bufferService
						.createFeaturesBuffer(busRouteFc.getFeatures(),
								parameter.getBus_Rt_BufferDistance(),
								layerMapping.getBusRoute());
				if (bufferCollection != null) {
					trasportationbufferCollection.addAll(bufferCollection);
				}
			}
		}

		Geometry union = null;
		if (!trasportationbufferCollection.isEmpty()){
			union = unionService.createUnion(trasportationbufferCollection);
		}
		return union;
	}

}
