//alert("lga2");
var lgaStore2 = Ext.create('Ext.data.Store', {
			autoLoad : true,
			model : "LGA",
			storeId : 'lgaStore2',
			fields : ['lgaCode', 'lgaName'],
			proxy : {
				type : 'ajax',
				url : 'getLGAs.json',
				reader : {
					type : 'json',
					root : 'lgas'
				}
			}
		});

var selectedLGAs2 = [];

var lgaCombo2 = new Ext.form.ComboBox({
			id : 'lgaCombo2',
			editable: false,
			allowBlank : true,
			forceSelection : false,
			labelWidth : 50,
			store : lgaStore2,
			displayField : 'lgaName',
			valueField : 'lgaCode',
			mode : 'local',
			fieldLabel : 'LGA',
			anchor : '50%',
			multiSelect : true,
			triggerAction : 'all',
			emptyText : 'Select LGAs...',
			selectOnFocus : true,
			margin : '6 0 10 10',
			listeners : {
				select : function(obj, records) {
					selectedLGAs2 = [];
					Ext.each(records, function(rec) {
								selectedLGAs2.push(rec.get('lgaCode'));
							});
					console.log(selectedLGAs2);
				},
				blur : function() {
					console.log("blur");
					if (this.getRawValue() == "") {
						selectedLGAs2 = [];
						this.clearValue();
					}
				},
				render : function(p) {
						Ext.QuickTips.register({
							target : p.getEl(),
							text : 'Select from LGA list and the analysis is performed only in the selected LGAs.'							
						});
					}
			}
		});

var LGA2 = Ext.create('Ext.form.Panel', {
			items : [lgaCombo2, selectedLGAs2],
			width : '100%',
			border : false
		});
