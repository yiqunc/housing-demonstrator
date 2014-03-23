var geographicVariables = Ext.create('Ext.form.Panel', {
			layout : {
				type : 'table',
				columns : 1
			},
			border : false,
			defaultType : 'checkboxfield',
			fieldDefaults : {
				margin : '3 5 6 5'
			},			
			bodyPadding : 3,
			items : [{
						xtype : 'checkboxfield',
						id : 'floodwayId',
						boxLabel : 'Floodway'						
					}, {
						xtype : 'checkboxfield',
						id : 'inundationId',
						boxLabel : 'Land Subject To Inundation'						
					}]
		});

var developAssesVariables = Ext.create('Ext.form.Panel', {
			border : false,
			layout : {
				type : 'table',
				columns : 2
			},
			autoHeight : true,
			bodyPadding : 5,
			defaultType : 'checkboxfield',
			fieldDefaults : {
				margin : '5 50 6 5'
			},
			items : [{
						xtype : 'checkboxfield',
						id : 'neighbourhoodId',
						boxLabel : 'Neighbourhood Character'
					}, {
						xtype : 'checkboxfield',
						id : 'parkingId',
						boxLabel : 'Parking Overlay'
					}, {
						xtype : 'checkboxfield',
						id : 'designDevelopmentId',
						boxLabel : 'Design and Development Overlay (DDO)'
					}, {
						xtype : 'checkboxfield',
						id : 'developPlansId',
						boxLabel : 'Development Plan Overlay (DPO)'
					}]
		});

var environmentalVariables = Ext.create('Ext.form.Panel', {
			border : false,
			layout : {
				type : 'table',
				columns : 3
			},
			autoHeight : true,
			bodyPadding : 5,
			defaultType : 'checkboxfield',
			fieldDefaults : {
				margin : '2 30 4 5'
			},
			items : [{
						xtype : 'checkboxfield',
						id : 'bushfireId',
						boxLabel : 'Bush Fire'
					}, {
						xtype : 'checkboxfield',
						id : 'erosionId',
						boxLabel : 'Erosion'
					}, {
						xtype : 'checkboxfield',
						id : 'vegetationProtectId',
						boxLabel : 'Vegetation Protection'
					}, {
						xtype : 'checkboxfield',
						id : 'salinityId',
						boxLabel : 'Salinity'
					}, {
						xtype : 'checkboxfield',
						id : 'contamintationId',
						boxLabel : 'Contamination'
					}, {
						xtype : 'checkboxfield',
						id : 'envSignificanceId',
						boxLabel : 'Environmental Significance'
					}, {
						xtype : 'checkboxfield',
						id : 'envAuditId',
						boxLabel : 'Environmental Audit'
					}]
		});

var heritage = Ext.create('Ext.form.Panel', {
			layout : {
				type : 'table',
				columns : 1
			},
			border : false,
			bodyPadding : 3,
			autoHeight : true,
			items : [{
						xtype : 'checkboxfield',
						id : 'heritageId',
						boxLabel : 'Heritage Overlay',
						margin : '3 0 6 7'
					}]
		});

var ownershipVariables = Ext.create('Ext.form.Panel', {
	border : false,
	layout : {
		type : 'table',
		columns : 2
	},
	autoHeight : true,
	bodyPadding : 5,
	defaultType : 'checkboxfield',
	fieldDefaults : {
		margin : '2 50 2 5'
	},
	listeners : {
		render : function(p) {
			Ext.QuickTips.register({
				target : p.getEl(),
				text : 'By selecting these parameters, only properties are included in the '
						+ 'analysis which does not have the useage of specified parameter'
			});
		}
	},
	items : [{
				xtype : 'checkboxfield',
				id : 'commonwealthLandId',
				boxLabel : 'Commonwealth Land'
			}, {
				xtype : 'checkboxfield',
				id : 'publicAcquisitionId',
				boxLabel : 'Public Acquisition'
			}]
});