var dpi = Ext.create('Ext.form.Panel', {
	layout : 'column',
	listeners : {
		render : function(p) {
			Ext.QuickTips.register({
				target : p.getEl(),
				text : 'DPI shows the Development Potential Index. '
						+ 'By selecting this parameter, only properties are included in the '
						+ 'analysis which has the specified DPI.'
			});
		}
	},
	bodyPadding : 2,
	items : [{
				xtype : 'label',
				text : 'DPI:',
				margin : '9 7 0 4',
				width : '15%'
			}, dpiCombo, {
				xtype : "numberfield",
				id : 'dpiId_value',
				readOnly : false,
				width : 35,
				value : 0,
				margin : '5 1 10 4',
				hideTrigger : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == e.ENTER) {
							Ext.getCmp("dpiId").setValue(field.getValue());
						}
					},
					blur : function(field) {
						Ext.getCmp("dpiId").setValue(field.getValue());
					}
				}
			}, {
				xtype : 'sliderfield',
				id : 'dpiId',
				width : '63%',
				increment : 0.1,
				decimalPrecision : 1,
				value : 0.0,
				minValue : 0,
				maxValue : 1.0,
				margin : '8 0 1 10',
				listeners : {
					change : function(select, thumb, newval, oldval) {
						Ext.getCmp("dpiId_value").setValue(thumb);
					},
					onDrag : function(e) {
						var pos = this.innerEl.translatePoints(this.tracker
								.getXY());
						this.setValue(Ext.util.Format.round(this
												.reverseValue(pos.left),
										this.decimalPrecision), true);
						this.fireEvent('drag', this, e);
					}
				}
			}]
});

var trainStation = Ext.create('Ext.form.Panel', {
	layout : 'column',

	autoHeight : true,
	frame : false,
	border : 0,
	items : [{
				xtype : 'label',
				forId : 'trainStationId_value',
				text : 'Train Station Distance:',
				margin : '9 4 0 4',
				width : '22%'
			}, {
				xtype : "numberfield",
				id : 'trainStationId_value',
				readOnly : false,
				width : 35,
				value : 0,
				margin : '10 2 0 0',
				hideTrigger : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == e.ENTER) {
							Ext.getCmp("trainStationId").setValue(field
									.getValue());
						}
					},
					blur : function(field) {
						Ext.getCmp("trainStationId").setValue(field.getValue());
					}
				}
			}, {
				xtype : 'label',
				text : 'm',
				margin : '9 4 0 0'

			}, {
				xtype : 'sliderfield',
				id : 'trainStationId',
				width : '63%',
				increment : 50,
				value : 0,
				minValue : 0,
				maxValue : 2000,
				margin : '9 10 0 0',
				listeners : {
					change : function(select, thumb, newval, oldval) {
						Ext.getCmp("trainStationId_value").setValue(thumb);
					}
				}
			}]
});

var trainRoute = Ext.create('Ext.form.Panel', {
			layout : 'column',

			autoHeight : true,
			frame : false,
			border : 0,
			items : [{
						xtype : 'label',
						forId : 'trainRouteId_value',
						text : 'Train Route Distance:',
						margin : '9 4 0 4',
						width : '22%'
					}, {
						xtype : "numberfield",
						id : 'trainRouteId_value',
						readOnly : false,
						width : 35,
						value : 0,
						margin : '7 2 0 0',
						hideTrigger : true,
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == e.ENTER) {
									Ext.getCmp("trainRouteId").setValue(field
											.getValue());
								}
							},
							blur : function(field) {
								Ext.getCmp("trainRouteId").setValue(field
										.getValue());
							}
						}
					}, {
						xtype : 'label',
						text : 'm',
						margin : '9 4 0 0'

					}, {
						xtype : 'sliderfield',
						id : 'trainRouteId',
						width : '63%',
						increment : 50,
						value : 0,
						minValue : 0,
						maxValue : 2000,
						margin : '9 10 0 0',
						listeners : {
							change : function(select, thumb, newval, oldval) {
								Ext.getCmp("trainRouteId_value")
										.setValue(thumb);
							}
						}
					}]
		});

var tramRoute = Ext.create('Ext.form.Panel', {
			layout : 'column',

			autoHeight : true,
			frame : false,
			border : 0,
			items : [{
						xtype : 'label',
						forId : 'tramRouteId_value',
						text : 'Tram Route Distance:',
						margin : '9 4 4 4',
						width : '22%'
					}, {
						xtype : "numberfield",
						id : 'tramRouteId_value',
						readOnly : false,
						width : 35,
						value : 0,
						margin : '7 2 4 0',
						hideTrigger : true,
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == e.ENTER) {
									Ext.getCmp("tramRouteId").setValue(field
											.getValue());
								}
							},
							blur : function(field) {
								Ext.getCmp("tramRouteId").setValue(field
										.getValue());
							}
						}
					}, {
						xtype : 'label',
						text : 'm',
						margin : '9 4 0 0'

					}, {
						xtype : 'sliderfield',
						id : 'tramRouteId',
						width : '63%',
						increment : 50,
						value : 0,
						minValue : 0,
						maxValue : 2000,
						margin : '9 10 4 0',
						listeners : {
							change : function(select, thumb, newval, oldval) {
								Ext.getCmp("tramRouteId_value").setValue(thumb);
							}
						}
					}]
		});

var busRoute = Ext.create('Ext.form.Panel', {
	layout : 'column',

	autoHeight : true,
	frame : false,
	border : 0,
	items : [{
				xtype : 'label',
				forId : 'busRouteId_value',
				text : 'Bus Route Distance:',
				margin : '2 4 15 4',
				width : '22%'
			}, {
				xtype : "numberfield",
				id : 'busRouteId_value',
				readOnly : false,
				width : 35,
				value : 0,
				margin : '2 2 15 0',
				hideTrigger : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == e.ENTER) {
							Ext.getCmp("busRouteId").setValue(field.getValue());
						}
					},
					blur : function(field) {
						Ext.getCmp("busRouteId").setValue(field.getValue());
					}
				}
			}, {
				xtype : 'label',
				text : 'm',
				margin : '6 4 0 0'

			}, {
				xtype : 'sliderfield',
				id : 'busRouteId',
				width : '63%',
				increment : 50,
				value : 0,
				minValue : 0,
				maxValue : 2000,
				margin : '6 10 10 0',
				listeners : {
					change : function(select, thumb, newval, oldval) {
						Ext.getCmp("busRouteId_value").setValue(thumb);
					}
				}
			}]
});

var transports = Ext.create('Ext.form.Panel', {
	listeners : {
		render : function(p) {
			Ext.QuickTips.register({
				target : p.getEl(),
				text : 'By selecting these parameters, only properties are included in the '
						+ 'analysis which located in a specified distance (meters) of any selected public transport. '
						+ 'For example if you select values for Train and Tram Stations, properties which are located '
						+ 'within the specified distance of Train OR Tram stations will be filtered.'
			});
		}
	},
	frame : true,
	autoHeight : true,
	title : 'Distance To Public Transport',
	width : '50%',

	bodyPadding : 1,
	items : [trainStation, trainRoute, tramRoute, busRoute]
});

var education = Ext.create('Ext.form.Panel', {
			layout : 'column',

			autoHeight : true,
			frame : false,
			border : 0,
			items : [{
						xtype : 'label',
						forId : 'educationId_value',
						text : 'Education Distance:',
						margin : '9 4 7 4',
						width : '22%'
					}, {
						xtype : "numberfield",
						id : 'educationId_value',
						readOnly : false,
						width : 35,
						value : 0,
						margin : '7 2 0 0',
						hideTrigger : true,
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == e.ENTER) {
									Ext.getCmp("educationId").setValue(field
											.getValue());
								}
							},
							blur : function(field) {
								Ext.getCmp("educationId").setValue(field
										.getValue());
							}
						}
					}, {
						xtype : 'label',
						text : 'm',
						margin : '9 4 0 0'

					}, {
						xtype : 'sliderfield',
						id : 'educationId',
						width : '63%',
						increment : 50,
						value : 0,
						minValue : 0,
						maxValue : 2000,
						margin : '9 10 0 0',
						listeners : {
							change : function(select, thumb, newval, oldval) {
								Ext.getCmp("educationId_value").setValue(thumb);
							}
						}
					}]
		});

var recreation = Ext.create('Ext.form.Panel', {
			layout : 'column',

			autoHeight : true,
			frame : false,
			border : 0,
			items : [{
						xtype : 'label',
						forId : 'recreationId_value',
						text : 'Recreation Distance:',
						margin : '10 4 7 4',
						width : '22%'
					}, {
						xtype : "numberfield",
						id : 'recreationId_value',
						readOnly : false,
						width : 35,
						value : 0,
						margin : '10 2 0 0',
						hideTrigger : true,
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == e.ENTER) {
									Ext.getCmp("recreationId").setValue(field
											.getValue());
								}
							},
							blur : function(field) {
								Ext.getCmp("recreationId").setValue(field
										.getValue());
							}
						}
					}, {
						xtype : 'label',
						text : 'm',
						margin : '10 4 0 0'

					}, {
						xtype : 'sliderfield',
						id : 'recreationId',
						width : '63%',
						increment : 50,
						value : 0,
						minValue : 0,
						maxValue : 2000,
						margin : '10 10 0 0',
						listeners : {
							change : function(select, thumb, newval, oldval) {
								Ext.getCmp("recreationId_value")
										.setValue(thumb);
							}
						}
					}]
		});

var medical = Ext.create('Ext.form.Panel', {
			layout : 'column',

			autoHeight : true,
			frame : false,
			border : 0,
			items : [{
						xtype : 'label',
						forId : 'medicalId_value',
						text : 'Medical Distance:',
						margin : '9 4 7 4',
						width : '22%'
					}, {
						xtype : "numberfield",
						id : 'medicalId_value',
						readOnly : false,
						width : 35,
						value : 0,
						margin : '7 2 0 0',
						hideTrigger : true,
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == e.ENTER) {
									Ext.getCmp("medicalId").setValue(field
											.getValue());
								}
							},
							blur : function(field) {
								Ext.getCmp("medicalId").setValue(field
										.getValue());
							}
						}
					}, {
						xtype : 'label',
						text : 'm',
						margin : '9 4 0 0'

					}, {
						xtype : 'sliderfield',
						id : 'medicalId',
						width : '63%',
						increment : 50,
						value : 0,
						minValue : 0,
						maxValue : 2000,
						margin : '9 10 0 0',
						listeners : {
							change : function(select, thumb, newval, oldval) {
								Ext.getCmp("medicalId_value").setValue(thumb);
							}
						}
					}]
		});

var community = Ext.create('Ext.form.Panel', {
			layout : 'column',

			autoHeight : true,
			frame : false,
			border : 0,
			items : [{
						xtype : 'label',
						forId : 'communityId_value',
						text : 'Community Distance:',
						margin : '9 4 7 4',
						width : '22%'
					}, {
						xtype : "numberfield",
						id : 'communityId_value',
						readOnly : false,
						width : 35,
						value : 0,
						margin : '7 2 0 0',
						hideTrigger : true,
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == e.ENTER) {
									Ext.getCmp("communityId").setValue(field
											.getValue());
								}
							},
							blur : function(field) {
								Ext.getCmp("communityId").setValue(field
										.getValue());
							}
						}
					}, {
						xtype : 'label',
						text : 'm',
						margin : '9 4 0 0'

					}, {
						xtype : 'sliderfield',
						id : 'communityId',
						width : '63%',
						increment : 50,
						value : 0,
						minValue : 0,
						maxValue : 2000,
						margin : '9 10 0 0',
						listeners : {
							change : function(select, thumb, newval, oldval) {
								Ext.getCmp("communityId_value").setValue(thumb);
							}
						}
					}]
		});

var utility = Ext.create('Ext.form.Panel', {
			layout : 'column',

			autoHeight : true,
			frame : false,
			border : 0,
			items : [{
						xtype : 'label',
						forId : 'utilityId_value',
						text : 'Utility Distance:',
						margin : '7 4 7 4',
						width : '22%'
					}, {
						xtype : "numberfield",
						id : 'utilityId_value',
						readOnly : false,
						width : 35,
						value : 0,
						margin : '5 2 10 0',
						hideTrigger : true,
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == e.ENTER) {
									Ext.getCmp("utilityId").setValue(field
											.getValue());
								}
							},
							blur : function(field) {
								Ext.getCmp("utilityId").setValue(field
										.getValue());
							}
						}
					}, {
						xtype : 'label',
						text : 'm',
						margin : '9 4 0 0'

					}, {
						xtype : 'sliderfield',
						id : 'utilityId',
						width : '63%',
						increment : 50,
						value : 0,
						minValue : 0,
						maxValue : 2000,
						margin : '9 10 4 0',
						listeners : {
							change : function(select, thumb, newval, oldval) {
								Ext.getCmp("utilityId_value").setValue(thumb);
							}
						}
					}]
		});

var employment = Ext.create('Ext.form.Panel', {
			layout : 'column',
			autoHeight : true,
			frame : false,
			border : 0,
			items : [{
						xtype : 'label',
						forId : 'employmentId_value',
						text : 'Employment Distance:',
						margin : '9 4 7 4',
						width : '22%'
					}, {
						xtype : "numberfield",
						id : 'employmentId_value',
						readOnly : false,
						width : 35,
						value : 0,
						margin : '7 2 5 0',
						hideTrigger : true,
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == e.ENTER) {
									Ext.getCmp("employmentId").setValue(field
											.getValue());
								}
							},
							blur : function(field) {
								Ext.getCmp("employmentId").setValue(field
										.getValue());
							}
						}
					}, {
						xtype : 'label',
						text : 'm',
						margin : '9 4 0 0'

					}, {
						xtype : 'sliderfield',
						id : 'employmentId',
						width : '63%',
						increment : 50,
						value : 0,
						minValue : 0,
						maxValue : 2000,
						margin : '9 10 0 0',
						listeners : {
							change : function(select, thumb, newval, oldval) {
								Ext.getCmp("employmentId_value")
										.setValue(thumb);
							}
						}
					}]
		});

var facilities = Ext.create('Ext.form.Panel', {
	listeners : {
		render : function(p) {
			Ext.QuickTips.register({
				target : p.getEl(),
				text : 'By selecting these parameters, only properties are included in the '
						+ 'analysis which located in a specified distance (meters) of any selected public facility '
						+ 'For example if you select values for Medical and Medical facilities, properties which are located '
						+ 'within the specified distance of Medical AND Medical facilities will be filtered.'
			});
		}
	},
	frame : true,
	title : 'Distance To Public Facilities',
	width : '50%',
	autoHeight : true,
	bodyPadding : 0,

	items : [recreation, education, medical, community, utility]
});

var landuses = Ext.create('Ext.form.Panel', {
	listeners : {
		render : function(p) {
			Ext.QuickTips.register({
				target : p.getEl(),
				text : 'By selecting these parameters, only properties are included in the '
						+ 'analysis which has the specified usage. For example if you check '
						+ 'Residential and Rural parameters, properties which have the usage of Residential '
						+ 'OR Rural will be filtered'
			});
		}
	},
	layout : 'column',
	autoHeight : true,
	frame : false,
	title : 'Potential Land Use',
	width : '50%',
	bodyPadding : 5,
	fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 140,
		anchor : '100%',
		margin : '8 0 8 10'
	},
	items : [{
				xtype : 'checkboxfield',
				id : 'residentialId',
				boxLabel : 'Residential'
			}, {
				xtype : 'checkboxfield',
				id : 'businessId',
				boxLabel : 'Business'
			}, {
				xtype : 'checkboxfield',
				id : 'ruralId',
				boxLabel : 'Rural'
			}, {
				xtype : 'checkboxfield',
				id : 'mixedUseId',
				boxLabel : 'Mixed Use'
			}, {
				xtype : 'checkboxfield',
				id : 'specialPurposeId',
				boxLabel : 'Special Purpose'
			}, {
				xtype : 'checkboxfield',
				id : 'urbanGrowthBoundryId',
				boxLabel : 'Urban Growth Boundary'
			}]
});

var geographicVariables = Ext.create('Ext.form.Panel', {
			layout : 'column',
			frame : false,
			title : 'Geographic Variables',
			width : '10%',
			bodyPadding : 5,
			items : [{
						xtype : 'checkboxfield',
						id : 'floodwayId',
						boxLabel : 'Floodway',
						margin : '10 200 10 5'
					}, {
						xtype : 'checkboxfield',
						id : 'inundationId',
						boxLabel : 'Land Subject To Inundation',
						margin : '5 200 10 5'
					}]
		});

var developAssesVariables = Ext.create('Ext.form.Panel', {

			title : 'Development Assesment Variables',
			width : '50%',

			bodyPadding : 5,

			fieldDefaults : {
				margin : '10 20 8 5'
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
			layout : 'column',
			frame : false,
			title : 'Environmental Variables',
			width : '50%',
			bodyPadding : 2,
			fieldDefaults : {
				margin : '10 20 5 5'
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
						boxLabel : 'Contamintation'
					}, {
						xtype : 'checkboxfield',
						id : 'envSignificanceId',
						boxLabel : 'Environmental Significance',
						margin : '10 20 10 5'
					}, {
						xtype : 'checkboxfield',
						id : 'envAuditId',
						boxLabel : 'Environmental Audit'
					}]
		});

var heritage = Ext.create('Ext.form.Panel', {
			layout : 'column',
			frame : false,
			title : 'Heritage',
			width : '50%',
			height : 68,
			bodyPadding : 5,
			fieldDefaults : {
				margin : '5 20 8 5'
			},
			items : [{
						xtype : 'checkboxfield',
						id : 'heritageId',
						boxLabel : 'Heritage Overlay'
					}]
		});

var ownershipVariables = Ext.create('Ext.form.Panel', {
	listeners : {
		render : function(p) {
			Ext.QuickTips.register({
				target : p.getEl(),
				text : 'By selecting these parameters, only properties are included in the '
						+ 'analysis which does not have the useage of specified parameter'
			});
		}
	},
	layout : 'column',
	frame : false,
	title : 'Ownership Variables',
	width : '50%',
	bodyPadding : 5,
	border : 0,
	fieldDefaults : {
		margin : '8 20 20 5'
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

// *************** Left hand form ***************
var leftForm_Potential = Ext.create('Ext.form.Panel', {
			frame : false,
			autoHeight : true,
			title : 'Potentials',
			items : [dpi, transports, facilities, landuses],
			width : '53%'
		});

// *************** Right hand form ***************
var rightForm_Potential = Ext.create('Ext.form.Panel', {
	listeners : {
		render : function(p) {
			Ext.QuickTips.register({
				target : p.getEl(),
				text : 'Properties selected in the left hand side of the form '
						+ 'will be intersected with any of the selected parameters to find out '
						+ 'if they have any overlay. The number of overlays for each property, illustrated with a range of '
						+ 'predefined colours in the result map.'
			});
		}
	},
	frame : false,
	autoHeight : true,
	items : [geographicVariables, developAssesVariables,
			environmentalVariables, heritage, ownershipVariables],
	width : '47%'
});

// *************** developementPotential Form ***************
var wholeForm_Potential = Ext.create('Ext.form.Panel', {
			layout : 'column',
			autoHeight : true,
			items : [leftForm_Potential, rightForm_Potential]
		});

// *************** Header Panel ***************
var LGA_Potential = Ext.create('Ext.form.Panel', {
			items : [LGA1],
			width : '50%'
		});

var analyseBtn_DevelopPotential = Ext.create('Ext.Button', {
	text : 'Analyse',
	margin : '0 5 8 5',
	handler : function() {
		if (developementPotential.getForm().isValid()) {
			var dpiVal = JSON
					.parse(dpi.getForm().findField('dpiId').getValue());
			var dpiOperateorVal = dpiCombo.getValue();

			var trainStationVal = JSON.parse(transports.getForm()
					.findField('trainStationId').getValue());

			var trainRouteVal = JSON.parse(transports.getForm()
					.findField('trainRouteId').getValue());

			var tramRouteVal = JSON.parse(transports.getForm()
					.findField('tramRouteId').getValue());

			var busRouteVal = JSON.parse(transports.getForm()
					.findField('busRouteId').getValue());

			var educationVal = JSON.parse(facilities.getForm()
					.findField('educationId').getValue());

			var recreationVal = JSON.parse(facilities.getForm()
					.findField('recreationId').getValue());

			var medicalVal = JSON.parse(facilities.getForm()
					.findField('medicalId').getValue());

			var communityVal = JSON.parse(facilities.getForm()
					.findField('communityId').getValue());

			var utilityVal = JSON.parse(facilities.getForm()
					.findField('utilityId').getValue());

			var residentialVal = JSON.parse(landuses.getForm()
					.findField('residentialId').getValue());
			var businessVal = JSON.parse(landuses.getForm()
					.findField('businessId').getValue());
			var ruralVal = JSON.parse(landuses.getForm().findField('ruralId')
					.getValue());
			var mixedUseVal = JSON.parse(landuses.getForm()
					.findField('mixedUseId').getValue());
			var specialPurposeVal = JSON.parse(landuses.getForm()
					.findField('specialPurposeId').getValue());
			var urbanGrowthBoundryVal = JSON.parse(landuses.getForm()
					.findField('urbanGrowthBoundryId').getValue());

			/*
			 * var slopeVal = JSON.parse(geographicVariables.getForm()
			 * .findField('slopeId').getValue());
			 */
			var floodwayVal = JSON.parse(geographicVariables.getForm()
					.findField('floodwayId').getValue());
			var inundationVal = JSON.parse(geographicVariables.getForm()
					.findField('inundationId').getValue());

			var neighbourhoodVal = JSON.parse(developAssesVariables.getForm()
					.findField('neighbourhoodId').getValue());
			var designDevelopmentVal = JSON.parse(developAssesVariables
					.getForm().findField('designDevelopmentId').getValue());
			var developPlansVal = JSON.parse(developAssesVariables.getForm()
					.findField('developPlansId').getValue());
			var parkingVal = JSON.parse(developAssesVariables.getForm()
					.findField('parkingId').getValue());

			var bushfireVal = JSON.parse(environmentalVariables.getForm()
					.findField('bushfireId').getValue());
			var erosionVal = JSON.parse(environmentalVariables.getForm()
					.findField('erosionId').getValue());
			var vegetationProtectVal = JSON.parse(environmentalVariables
					.getForm().findField('vegetationProtectId').getValue());
			var salinityVal = JSON.parse(environmentalVariables.getForm()
					.findField('salinityId').getValue());
			var contamintationVal = JSON.parse(environmentalVariables.getForm()
					.findField('contamintationId').getValue());
			var envSignificanceVal = JSON.parse(environmentalVariables
					.getForm().findField('envSignificanceId').getValue());
			var envAuditVal = JSON.parse(environmentalVariables.getForm()
					.findField('envAuditId').getValue());

			var heritageVal = JSON.parse(heritage.getForm()
					.findField('heritageId').getValue());

			var commonwealthLandVal = JSON.parse(ownershipVariables.getForm()
					.findField('commonwealthLandId').getValue());
			var publicAcquisitionVal = JSON.parse(ownershipVariables.getForm()
					.findField('publicAcquisitionId').getValue());

			var waitingMsg2 = Ext.MessageBox.wait('Processing...',
					'Performing Analysis');

			Ext.Ajax.request({
						url : '/housing/housing-controller/developmentPotential',
						method : 'post',
						waitMsg : 'Saving changes...',
						jsonData : {
							selectedLGAs1 : selectedLGAs1,

							dpiOperateorVal : dpiOperateorVal,
							dpiVal : dpiVal,

							trainStationVal : trainStationVal,
							trainRouteVal : trainRouteVal,
							tramRouteVal : tramRouteVal,
							busRouteVal : busRouteVal,

							educationVal : educationVal,

							recreationVal : recreationVal,

							medicalVal : medicalVal,

							communityVal : communityVal,

							utilityVal : utilityVal,

							residentialVal : residentialVal,
							businessVal : businessVal,
							ruralVal : ruralVal,
							mixedUseVal : mixedUseVal,
							specialPurposeVal : specialPurposeVal,
							urbanGrowthBoundryVal : urbanGrowthBoundryVal,

							/* slopeVal : slopeVal, */
							floodwayVal : floodwayVal,
							inundationVal : inundationVal,

							neighbourhoodVal : neighbourhoodVal,
							designDevelopmentVal : designDevelopmentVal,
							developPlansVal : developPlansVal,
							parkingVal : parkingVal,

							bushfireVal : bushfireVal,
							erosionVal : erosionVal,
							vegetationProtectVal : vegetationProtectVal,
							salinityVal : salinityVal,
							contamintationVal : contamintationVal,
							envSignificanceVal : envSignificanceVal,
							envAuditVal : envAuditVal,

							heritageVal : heritageVal,

							commonwealthLandVal : commonwealthLandVal,
							publicAcquisitionVal : publicAcquisitionVal

						},
						success : function(response) {
							waitingMsg2.hide();
							var jresp = Ext.JSON.decode(response.responseText);
							console.log(jresp.message);
							if (jresp.successStatus == "success") {
								var showMap = new Ext.Window({
											title : 'Analysis Status',
											height : 100,
											padding : 1,
											width : 300,
											style : {
												"text-align" : "center"
											},
											items : [{
														xtype : 'label',
														text : jresp.message
													}],
											buttons : [{
												text : 'Show Map',
												handler : function() {
													window
															.open(
																	'ui-jsp/map_potential.jsp',
																	"_blank");
													showMap.close();
												}
											}]
										}).show();
							} else {
								Ext.Msg.show({
											title : 'Analysis Status',
											msg : jresp.message,
											width : 400,
											buttons : Ext.Msg.OK,
											icon : Ext.MessageBox.WARNING
										});
							}
						},
						failure : function(response, options) {
							waitingMsg2.hide();
							var jresp = Ext.JSON.decode(response.responseText);
							Ext.MessageBox.alert(jresp.message);
						}

					});
		} else {
			alert("Please select at least one LGA!");
		}
	}
});


var clearBtn_Potential = Ext.create('Ext.Button', {
			text : 'Clear',
			margin : '0 5 8 5',
			handler : function() {
				Ext.getCmp("dpiId").setValue(0);
				Ext.getCmp("dpiId_value").setValue(0);

				Ext.getCmp("trainStationId").setValue(0);
				Ext.getCmp("trainStationId_value").setValue(0);

				Ext.getCmp("trainRouteId").setValue(0);
				Ext.getCmp("trainRouteId_value").setValue(0);

				Ext.getCmp("tramRouteId").setValue(0);
				Ext.getCmp("tramRouteId_value").setValue(0);

				Ext.getCmp("busRouteVal").setValue(0);
				Ext.getCmp("busRouteId_value").setValue(0);

				Ext.getCmp("educationId").setValue(0);
				Ext.getCmp("educationId_value").setValue(0);

				Ext.getCmp("recreationId").setValue(0);
				Ext.getCmp("recreationId_value").setValue(0);

				Ext.getCmp("medicalId").setValue(0);
				Ext.getCmp("medicalId_value").setValue(0);

				Ext.getCmp("communityId").setValue(0);
				Ext.getCmp("communityId_value").setValue(0);

				Ext.getCmp("utilityId").setValue(0);
				Ext.getCmp("utilityId_value").setValue(0);

				Ext.getCmp("employmentId").setValue(0);
				Ext.getCmp("employmentId_value").setValue(0);

				Ext.getCmp("residentialId").setValue(false);
				Ext.getCmp("businessId").setValue(false);
				Ext.getCmp("ruralId").setValue(false);
				Ext.getCmp("mixedUseId").setValue(false);
				Ext.getCmp("specialPurposeId").setValue(false);
				Ext.getCmp("urbanGrowthBoundryId").setValue(false);

				Ext.getCmp("floodwayId").setValue(false);
				Ext.getCmp("inundationId").setValue(false);
				Ext.getCmp("neighbourhoodId").setValue(false);
				Ext.getCmp("parkingId").setValue(false);
				Ext.getCmp("designDevelopmentId").setValue(false);
				Ext.getCmp("developPlansId").setValue(false);
				Ext.getCmp("bushfireId").setValue(false);
				Ext.getCmp("erosionId").setValue(false);
				Ext.getCmp("vegetationProtectId").setValue(false);
				Ext.getCmp("salinityId").setValue(false);
				Ext.getCmp("contamintationId").setValue(false);
				Ext.getCmp("envSignificanceId").setValue(false);
				Ext.getCmp("envAuditId").setValue(false);
				Ext.getCmp("heritageId").setValue(false);
				Ext.getCmp("commonwealthLandId").setValue(false);
				Ext.getCmp("publicAcquisitionId").setValue(false);

				lgaCombo1.clearValue();
				lgaCombo1.applyEmptyText();
				lgaCombo1.getPicker().getSelectionModel().doMultiSelect([],
						false);

			}
		});

// *************** Footer Panel ***************
var footerPanel_Potential = Ext.create('Ext.form.Panel', {
			layout : 'column',
			border : 0,
			frame : true,
			items : [analyseBtn_DevelopPotential, clearBtn_Potential]
		});

// *************** whole Form1 ***************
var developementPotential = Ext.create('Ext.form.Panel', {
			frame : true,
			autoScroll : true,
			autoHeight : true,
			title : 'Developement Potential Analysis',
			items : [LGA_Potential, wholeForm_Potential, footerPanel_Potential],
			/* height : 578, */
			autoHeight : true,
			width : 1000
		});
