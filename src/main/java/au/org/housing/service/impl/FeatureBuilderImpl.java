package au.org.housing.service.impl;

import java.util.Collection;
import java.util.Iterator;

import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.feature.DefaultFeatureCollection;
import org.geotools.feature.FeatureCollections;
import org.geotools.feature.simple.SimpleFeatureBuilder;
import org.geotools.feature.simple.SimpleFeatureTypeBuilder;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.feature.type.AttributeDescriptor;
import org.opengis.feature.type.GeometryDescriptor;
import org.springframework.stereotype.Service;

import au.org.housing.service.FeatureBuilder;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Polygon;

/**
 * Implementation for creating new feature type or
 * simple feature or a collection of features
 *
 * @author Gh.Karami
 * @version 1.0
 *
 */ 

@Service
public class FeatureBuilderImpl implements FeatureBuilder{
	
	private SimpleFeatureType type;

	public SimpleFeatureType getType() {
		return type;
	}

	public SimpleFeature buildFeature(Geometry geometry){
		SimpleFeatureBuilder builder = createFeatureBuilder();
		builder.add(geometry);
		return builder.buildFeature(null);
	}

	public SimpleFeatureCollection buildFeatureCollection(Collection<Geometry> geometryCollection){
		DefaultFeatureCollection featureCollection = (DefaultFeatureCollection) FeatureCollections.newCollection();
		Iterator<Geometry> i = geometryCollection.iterator();
		while(i.hasNext()){
			Geometry geometry = i.next();
			SimpleFeature simpleFeature = buildFeature(geometry);
			featureCollection.add(simpleFeature);
		}
		i.remove();
		return featureCollection;
	}	

	public SimpleFeatureBuilder createFeatureBuilder() {
		SimpleFeatureTypeBuilder typeBuilder = new SimpleFeatureTypeBuilder();
		typeBuilder.setName("a-type-name");
		typeBuilder.add("location", MultiPolygon.class);
//		SimpleFeatureType type = typeBuilder.buildFeatureType();
		type = typeBuilder.buildFeatureType();
		return new SimpleFeatureBuilder(type);
	}
	
	public SimpleFeatureTypeBuilder createFeatureTypeBuilder(SimpleFeatureType sft, String typeName) {
		SimpleFeatureTypeBuilder stb = new SimpleFeatureTypeBuilder();
		stb.setName(typeName);
		for (AttributeDescriptor attDisc : sft.getAttributeDescriptors()) {
			String name = attDisc.getLocalName();
			Class type = attDisc.getType().getBinding();  
			if (attDisc instanceof GeometryDescriptor) {
				stb.add( name, Polygon.class );
			}else{
				stb.add(name, type);
			}
		}
		return stb;
	}

	
}
