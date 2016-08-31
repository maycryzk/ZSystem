/*
jQWidgets v3.3.0 (2014-May-26)
Copyright (c) 2011-2014 jQWidgets.
License: http://jqwidgets.com/license/
 */

(function(b) {
	b.jqx.jqxWidget("jqxDataTable", "", {});
	b
			.extend(
					b.jqx._jqxDataTable.prototype,
					{
						defineInstance : function() {
							this.altrows = false;
							this.aggregatesheight = 34;
							this.autoshowloadelement = true;
							this.autorowheight = true;
							this.columnsheight = 30;
							this.columns = [];
							this.columngroups = null;
							this.columnsresize = false;
							this.columnsreorder = false;
							this.dataview = null;
							this.disabled = false;
							this.editable = false;
							this.editSettings = {
								saveOnPageChange : true,
								saveOnBlur : true,
								saveOnSelectionChange : true,
								cancelOnEsc : true,
								saveOnEnter : true,
								editSingleCell : false,
								editOnDoubleClick : true,
								editOnF2 : true
							};
							this.enablehover = true;
							this.enablebrowserselection = false;
							this.filterheight = 30;
							this.filterable = false;
							this.filtermode = "default";
							this.groupsrenderer = null;
							this.groups = new Array();
							this.headerZIndex = 59;
							this.height = null;
							this.handlekeyboardnavigation = null;
							this.indentwidth = 25;
							this.initrowdetails = false;
							this.loadingerrormessage = "The data is still loading and you cannot set a property or call a method. You can do that once the data binding is completed. jqxDataTable raises the 'bindingComplete' event when the binding is completed.";
							this.localization = null;
							this.pagerheight = 28;
							this.pagesize = 10;
							this.pagesizeoptions = [ "5", "10", "20" ];
							this.pageable = false;
							this.pagerposition = "bottom";
							this.pagermode = "default";
							this.pagerbuttonscount = 5;
							this.pagerrenderer = null;
							this.ready = null;
							this.rendertoolbar = null;
							this.rowdetails = false;
							this.renderstatusbar = null;
							this.rendered = null;
							this.rendering = null;
							this.rtl = false;
							this.sortable = false;
							this.showtoolbar = false;
							this.showstatusbar = false;
							this.statusbarheight = 34;
							this.serverProcessing = false;
							this.selectionmode = "multiplerows";
							this.scrollbarsize = b.jqx.utilities.scrollBarSize;
							this.touchscrollbarsize = b.jqx.utilities.touchScrollBarSize;
							this.showaggregates = false;
							this.showheader = true;
							this.maxHeight = 999999;
							this.maxWidth = 999999;
							this.exportSettings = {
								columnsHeader : true,
								hiddenColumns : false,
								serverURL : null,
								characterSet : null,
								collapsedRecords : false,
								recordsInView : true,
								fileName : "jqxDataTable"
							};
							this.source = {
								beforeprocessing : null,
								beforesend : null,
								loaderror : null,
								localdata : null,
								data : null,
								datatype : "array",
								datafields : [],
								url : "",
								root : "",
								record : "",
								id : "",
								totalrecords : 0,
								recordstartindex : 0,
								recordendindex : 0,
								loadallrecords : true,
								sortcolumn : null,
								sortdirection : null,
								sort : null,
								filter : null,
								sortcomparer : null
							};
							this.toolbarheight = 34;
							this.tableZIndex = 69;
							this._updating = false;
							this.touchmode = "auto";
							this.width = null;
							this.that = this;
							this.incrementalSearch = true;
							this.events = [ "bindingComplete", "sort",
									"filter", "pageChanged", "pageSizeChanged",
									"rowClick", "rowDoubleClick",
									"cellValueChanged", "rowBeginEdit",
									"rowEndEdit", "rowSelect", "rowUnselect",
									"rowCheck", "rowUncheck", "columnResized",
									"columnReordered", "rowExpand",
									"rowCollapse", "cellBeginEdit",
									"cellEndEdit" ]
						},
						createInstance : function(e) {
							if (b.jqx.utilities.scrollBarSize != 15) {
								this.scrollbarsize = b.jqx.utilities.scrollBarSize
							}
							if (this.element.nodeName.toLowerCase() == "table") {
								var n = this.host.find("tbody tr");
								var d = this.host.find("th");
								var w = new Array();
								if (d.length === 0) {
									d = n[0];
									n.splice(0, 1)
								}
								if (this.localizestrings) {
									this.localizestrings();
									if (this.localization != null) {
										this.localizestrings(this.localization,
												false)
									}
								}
								var z = [];
								for (var u = 0; u < n.length; u++) {
									var k = n[u];
									var h = {};
									for (var t = 0; t < d.length; t++) {
										var g = b.trim(b(d[t]).text());
										if (u === 0) {
											var s = {
												name : g
											};
											if (this.columns[t]
													&& this.columns[t].cellsFormat) {
												var v = this.columns[t].cellsFormat
														.toLowerCase();
												if (v.indexOf("p") != -1
														|| v.indexOf("c") != -1
														|| v.indexOf("n") != -1
														|| v.indexOf("f") != -1) {
													s.type = "number"
												}
												if (v.indexOf("d") != -1
														|| v.indexOf("m") != -1
														|| v.indexOf("y") != -1
														|| v.indexOf("h") != -1
														|| v.indexOf("m") != -1
														|| v.indexOf("s") != -1
														|| v.indexOf("t") != -1) {
													s.type = "date"
												}
											}
											w.push(s)
										}
										var c = b(k).find("td:eq(" + t + ")");
										var f = w[t].type;
										if (f) {
											var p = this.getvaluebytype(b
													.trim(c.text()), w[t]);
											h[g] = p
										} else {
											h[g] = b.trim(c.text())
										}
									}
									z[z.length] = h
								}
								this.host.wrap("<div></div>");
								var m = this.host.parent();
								var q = this.host.data();
								q.jqxDataTable.host = m;
								q.jqxDataTable.element = m[0];
								this.host.parent()[0].id = this.element.id;
								try {
									this.host.parent()[0].style = this.element.style
								} catch (r) {
								}
								this.element = m[0];
								this.host = m;
								this.host.data(q);
								if (this.source == null
										|| this.source._source == null) {
									var o = {
										dataFields : w,
										localdata : z,
										datatype : "array"
									};
									var y = new b.jqx.dataAdapter(o);
									this.source = y
								}
							}
							if (this.source && !this.source.dataBind) {
								this.source = new b.jqx.dataAdapter(this.source)
							}
							var x = this.source._source.datafields;
							if (x && x.length > 0) {
								this._camelCase = this.source._source.dataFields !== undefined;
								this.selectionmode = this.selectionmode
										.toLowerCase()
							}
							if (this.host.attr("tabindex") == null) {
								this.host.attr("tabindex", "0")
							}
							this.host.attr("role", "grid");
							this.host.attr("align", "left");
							this.host.addClass(this.toTP("jqx-grid"));
							this.host.addClass(this.toTP("jqx-reset"));
							this.host.addClass(this.toTP("jqx-rc-all"));
							this.host.addClass(this.toTP("jqx-widget"));
							this.host.addClass(this.toTP("jqx-widget-content"));
							if (this._testmodules()) {
								return
							}
							this.render(true);
							var l = this;
							b.jqx.utilities.resize(this.host, function() {
								var A = b(window).width();
								var i = b(window).height();
								var j = l.host.width();
								var B = l.host.height();
								if (l._lastHostWidth != j
										|| l._lastHostHeight != B) {
									l._updatesize(l._lastHostWidth != j,
											l._lastHostHeight != B)
								}
								l._lastWidth = A;
								l._lastHeight = i;
								l._lastHostWidth = j;
								l._lastHostHeight = B
							})
						},
						getvaluebytype : function(h, d) {
							var f = h;
							if (h == null) {
								return h
							}
							if (this.gridlocalization.decimalseparator == ",") {
								if (h
										.indexOf(this.gridlocalization.decimalseparator) >= 0) {
									h = h
											.replace(
													this.gridlocalization.decimalseparator,
													".")
								}
							}
							if (h.indexOf(this.gridlocalization.currencysymbol) >= 0) {
								h = h.replace(
										this.gridlocalization.currencysymbol,
										"")
							}
							if (h
									.indexOf(this.gridlocalization.percentagesymbol) >= 0) {
								h = h.replace(
										this.gridlocalization.percentagesymbol,
										"")
							}
							if (b.isArray(h) && d.type != "array") {
								for (var e = 0; e < h.length; e++) {
									h[e] = this.getvaluebytype(h[e], d)
								}
								return h
							}
							if (d.type == "date") {
								if (h == "NaN") {
									h = ""
								} else {
									var g = new Date(h);
									if (typeof h == "string") {
										if (d.format) {
											var c = b.jqx.dataFormat.parsedate(
													h, d.format);
											if (c != null) {
												g = c
											}
										}
									}
									if (g.toString() == "NaN"
											|| g.toString() == "Invalid Date") {
										if (b.jqx.dataFormat) {
											h = b.jqx.dataFormat
													.tryparsedate(h)
										} else {
											h = g
										}
									} else {
										h = g
									}
									if (h == null) {
										h = f
									}
								}
							} else {
								if (d.type == "float" || d.type == "number"
										|| d.type == "decimal") {
									if (h == "NaN") {
										h = ""
									} else {
										var h = parseFloat(h);
										if (isNaN(h)) {
											h = f
										}
									}
								} else {
									if (d.type == "int" || d.type == "integer") {
										var h = parseInt(h);
										if (isNaN(h)) {
											h = f
										}
									} else {
										if (d.type == "bool"
												|| d.type == "boolean") {
											if (h != null) {
												if (h.toLowerCase != undefined) {
													if (h.toLowerCase() == "false") {
														h = false
													} else {
														if (h.toLowerCase() == "true") {
															h = true
														}
													}
												}
											}
											if (h == 1) {
												h = true
											} else {
												if (h == 0 && h !== "") {
													h = false
												} else {
													h = ""
												}
											}
										}
									}
								}
							}
							return h
						},
						_builddataloadelement : function() {
							if (this.dataloadelement) {
								this.dataloadelement.remove()
							}
							this.dataloadelement = b('<div style="z-index: 99998; background-color:rgba(50,50,50,0.1); overflow: hidden; position: absolute;"></div>');
							var d = b('<div style="z-index: 99999; margin-left: -66px; left: 50%; top: 50%; margin-top: -24px; position: relative; width: 100px; height: 33px; padding: 5px; font-family: verdana; font-size: 12px; color: #767676; border-color: #898989; border-width: 1px; border-style: solid; background: #f6f6f6; border-collapse: collapse;"><div style="float: left;"><div style="float: left; overflow: hidden; width: 32px; height: 32px;" class="jqx-grid-load"/><span style="margin-top: 10px; float: left; display: block; margin-left: 5px;" >'
									+ this.gridlocalization.loadtext
									+ "</span></div></div>");
							d.addClass(this.toTP("jqx-rc-all"));
							this.dataloadelement.addClass(this
									.toTP("jqx-rc-all"));
							d.addClass(this.toTP("jqx-fill-state-normal"));
							this.dataloadelement.append(d);
							this.dataloadelement.width(this.width);
							this.dataloadelement.height(this.height);
							this.host.prepend(this.dataloadelement);
							if (this.source._source.url != "") {
								var c = false;
								if (this.height === "auto"
										|| this.height === null
										|| this.autoheight) {
									if (this.maxHeight == 999999) {
										c = true
									}
								}
								if (c) {
									this.host.height(100);
									this.dataloadelement.height(100)
								} else {
									this.host.height(this.height);
									this.dataloadelement.height(this.height)
								}
								var e = false;
								if (this.width === "auto"
										|| this.width === null
										|| this.autoWidth) {
									e = true
								}
								if (e) {
									this.host.width(300);
									this.dataloadelement.width(300)
								} else {
									this.host.width(this.width);
									this.dataloadelement.width(this.width)
								}
							}
						},
						_measureElement : function(d) {
							var c = b("<span style='visibility: hidden; white-space: nowrap;'>measure Text</span>");
							c.addClass(this.toTP("jqx-widget"));
							b(document.body).append(c);
							if (d == "cell") {
								this._cellheight = c.height()
							} else {
								this._columnheight = c.height()
							}
							c.remove()
						},
						_testmodules : function() {
							var g = "";
							var e = this;
							var c = function() {
								if (g.length != "") {
									g += ","
								}
							};
							if (!this.host.jqxScrollBar) {
								c();
								g += " jqxscrollbar.js"
							}
							if (!this.host.jqxButton) {
								c();
								g += " jqxbuttons.js"
							}
							if (!b.jqx.dataAdapter) {
								c();
								g += " jqxdata.js"
							}
							if (g != "" || this.editable || this.filterable
									|| this.pageable) {
								var d = [];
								var f = function(h) {
									switch (h) {
									case "checkbox":
										if (!e.host.jqxCheckBox && !d.checkbox) {
											d.checkbox = true;
											c();
											g += " jqxcheckbox.js"
										}
										break;
									case "dropdownlist":
										if (!e.host.jqxDropDownList
												&& !d.dropdownlist) {
											c();
											d.dropdownlist = true;
											g += " jqxdropdownlist.js(requires: jqxlistbox.js)"
										} else {
											if (!e.host.jqxListBox
													&& !d.listbox) {
												c();
												d.listbox = true;
												g += " jqxlistbox.js"
											}
										}
										break
									}
								};
								if ((this.filterable && this.filtermode != "simple")
										|| (this.pagermode == "advanced" && this.pageable)) {
									f("dropdownlist")
								}
								if (g != "") {
									throw new Error(
											"jqxDataTable: Missing references to the following module(s): "
													+ g);
									this.host.remove();
									return true
								}
							}
							return false
						},
						focus : function() {
							try {
								this.wrapper.focus();
								var d = this;
								setTimeout(function() {
									d.wrapper.focus()
								}, 10);
								this.focused = true
							} catch (c) {
							}
						},
						hiddenParent : function() {
							return b.jqx.isHidden(this.host)
						},
						_updatesize : function(h, g) {
							if (this._loading) {
								return
							}
							var e = this;
							var f = e.host.width();
							var d = e.host.height();
							if (!e._oldWidth) {
								e._oldWidth = f
							}
							if (!e._oldHeight) {
								e._oldHeight = d
							}
							if (e._resizeTimer != undefined) {
								clearTimeout(e._resizeTimer);
								e._resizeTimer = null
							}
							var c = b.jqx.browser.msie ? 30 : 30;
							e._resizeTimer = setTimeout(function() {
								clearTimeout(e._resizeTimer);
								e.resizingGrid = true;
								if (b.jqx.isHidden(e.host)) {
									return
								}
								e._updatecolumnwidths();
								e.refresh();
								e._oldWidth = f;
								e._oldHeight = d;
								e.resizingGrid = false
							}, c)
						},
						resize : function(d, c) {
							if (d != undefined) {
								this.width = d
							}
							if (c != undefined) {
								this.height = c
							}
							this._updatecolumnwidths();
							this.refresh()
						},
						isTouchDevice : function() {
							if (this.touchDevice != undefined) {
								return this.touchDevice
							}
							var c = b.jqx.mobile.isTouchDevice();
							this.touchDevice = c;
							if (this.touchmode == true) {
								c = true;
								b.jqx.mobile.setMobileSimulator(this.element);
								this.touchDevice = c
							} else {
								if (this.touchmode == false) {
									c = false
								}
							}
							if (c) {
								this.touchDevice = true;
								this.host.addClass(this
										.toThemeProperty("jqx-touch"));
								this.host.find("jqx-widget-content").addClass(
										this.toThemeProperty("jqx-touch"));
								this.host.find("jqx-widget-header").addClass(
										this.toThemeProperty("jqx-touch"));
								this.scrollbarsize = this.touchscrollbarsize
							}
							return c
						},
						toTP : function(c) {
							return this.toThemeProperty(c)
						},
						localizestrings : function(c, d) {
							this._cellscache = new Array();
							if (b.jqx.dataFormat) {
								b.jqx.dataFormat.cleardatescache()
							}
							if (this._loading) {
								throw new Error("jqxDataTable: "
										+ this.loadingerrormessage);
								return false
							}
							if (c != null) {
								for ( var e in c) {
									if (e.toLowerCase() !== e) {
										c[e.toLowerCase()] = c[e]
									}
								}
								if (c.pagergotopagestring) {
									this.gridlocalization.pagergotopagestring = c.pagergotopagestring
								}
								if (c.pagershowrowsstring) {
									this.gridlocalization.pagershowrowsstring = c.pagershowrowsstring
								}
								if (c.pagerrangestring) {
									this.gridlocalization.pagerrangestring = c.pagerrangestring
								}
								if (c.pagernextbuttonstring) {
									this.gridlocalization.pagernextbuttonstring = c.pagernextbuttonstring
								}
								if (c.pagerpreviousbuttonstring) {
									this.gridlocalization.pagerpreviousbuttonstring = c.pagerpreviousbuttonstring
								}
								if (c.pagerfirstbuttonstring) {
									this.gridlocalization.pagerfirstbuttonstring = c.pagerfirstbuttonstring
								}
								if (c.pagerlastbuttonstring) {
									this.gridlocalization.pagerlastbuttonstring = c.pagerlastbuttonstring
								}
								if (c.toppagerstring) {
									this.gridlocalization.toppagerstring = c.toppagerstring
								}
								if (c.firstDay) {
									this.gridlocalization.firstDay = c.firstDay
								}
								if (c.days) {
									this.gridlocalization.days = c.days
								}
								if (c.months) {
									this.gridlocalization.months = c.months
								}
								if (c.AM) {
									this.gridlocalization.AM = c.AM
								}
								if (c.PM) {
									this.gridlocalization.PM = c.PM
								}
								if (c.patterns) {
									this.gridlocalization.patterns = c.patterns
								}
								if (c.percentsymbol) {
									this.gridlocalization.percentsymbol = c.percentsymbol
								}
								if (c.currencysymbol) {
									this.gridlocalization.currencysymbol = c.currencysymbol
								}
								if (c.currencysymbolposition) {
									this.gridlocalization.currencysymbolposition = c.currencysymbolposition
								}
								if (c.decimalseparator) {
									this.gridlocalization.decimalseparator = c.decimalseparator
								}
								if (c.thousandsseparator) {
									this.gridlocalization.thousandsseparator = c.thousandsseparator
								}
								if (c.filterapplystring) {
									this.gridlocalization.filterapplystring = c.filterapplystring
								}
								if (c.filteraddnew) {
									this.gridlocalization.filteraddnew = c.filteraddnew
								}
								if (c.filtercancelstring) {
									this.gridlocalization.filtercancelstring = c.filtercancelstring
								}
								if (c.filterclearstring) {
									this.gridlocalization.filterclearstring = c.filterclearstring
								}
								if (c.filterstring) {
									this.gridlocalization.filterstring = c.filterstring
								}
								if (c.filterstringcomparisonoperators) {
									this.gridlocalization.filterstringcomparisonoperators = c.filterstringcomparisonoperators
								}
								if (c.filternumericcomparisonoperators) {
									this.gridlocalization.filternumericcomparisonoperators = c.filternumericcomparisonoperators
								}
								if (c.filterdatecomparisonoperators) {
									this.gridlocalization.filterdatecomparisonoperators = c.filterdatecomparisonoperators
								}
								if (c.filterbooleancomparisonoperators) {
									this.gridlocalization.filterbooleancomparisonoperators = c.filterbooleancomparisonoperators
								}
								if (c.emptydatastring) {
									this.gridlocalization.emptydatastring = c.emptydatastring
								}
								if (c.filterselectstring) {
									this.gridlocalization.filterselectstring = c.filterselectstring
								}
								if (c.todaystring) {
									this.gridlocalization.todaystring = c.todaystring
								}
								if (c.clearstring) {
									this.gridlocalization.clearstring = c.clearstring
								}
								if (c.validationstring) {
									this.gridlocalization.validationstring = c.validationstring
								}
								if (c.loadtext) {
									this.gridlocalization.loadtext = c.loadtext
								}
								if (c.filtersearchstring) {
									this.gridlocalization.filtersearchstring = c.filtersearchstring
								}
								if (c.loadingerrormessage) {
									this.gridlocalization.loadingerrormessage = c.loadingerrormessage;
									this.loadingerrormessage = c.loadingerrormessage
								}
								if (d !== false) {
									this._builddataloadelement();
									b(this.dataloadelement).css("visibility",
											"hidden");
									b(this.dataloadelement).css("display",
											"none")
								}
							} else {
								this.gridlocalization = {
									"/" : "/",
									":" : ":",
									firstDay : 0,
									days : {
										names : [ "Sunday", "Monday",
												"Tuesday", "Wednesday",
												"Thursday", "Friday",
												"Saturday" ],
										namesAbbr : [ "Sun", "Mon", "Tue",
												"Wed", "Thu", "Fri", "Sat" ],
										namesShort : [ "Su", "Mo", "Tu", "We",
												"Th", "Fr", "Sa" ]
									},
									months : {
										names : [ "January", "February",
												"March", "April", "May",
												"June", "July", "August",
												"September", "October",
												"November", "December", "" ],
										namesAbbr : [ "Jan", "Feb", "Mar",
												"Apr", "May", "Jun", "Jul",
												"Aug", "Sep", "Oct", "Nov",
												"Dec", "" ]
									},
									AM : [ "AM", "am", "AM" ],
									PM : [ "PM", "pm", "PM" ],
									eras : [ {
										name : "A.D.",
										start : null,
										offset : 0
									} ],
									twoDigitYearMax : 2029,
									patterns : {
										d : "M/d/yyyy",
										D : "dddd, MMMM dd, yyyy",
										t : "h:mm tt",
										T : "h:mm:ss tt",
										f : "dddd, MMMM dd, yyyy h:mm tt",
										F : "dddd, MMMM dd, yyyy h:mm:ss tt",
										M : "MMMM dd",
										Y : "yyyy MMMM",
										S : "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
										ISO : "yyyy-MM-dd hh:mm:ss",
										ISO2 : "yyyy-MM-dd HH:mm:ss",
										d1 : "dd.MM.yyyy",
										d2 : "dd-MM-yyyy",
										d3 : "dd-MMMM-yyyy",
										d4 : "dd-MM-yy",
										d5 : "H:mm",
										d6 : "HH:mm",
										d7 : "HH:mm tt",
										d8 : "dd/MMMM/yyyy",
										d9 : "MMMM-dd",
										d10 : "MM-dd",
										d11 : "MM-dd-yyyy"
									},
									percentsymbol : "%",
									currencysymbol : "$",
									currencysymbolposition : "before",
									decimalseparator : ".",
									thousandsseparator : ",",
									pagergotopagestring : "Go to page:",
									pagershowrowsstring : "Show rows:",
									pagerrangestring : " 到 ",
									pagerpreviousbuttonstring : "previous",
									pagernextbuttonstring : "next",
									pagerfirstbuttonstring : "first",
									pagerlastbuttonstring : "last",
									filterapplystring : "Apply",
									filtercancelstring : "Cancel",
									filterclearstring : "Clear Filter",
									filterstring : "advanced",
									filtersearchstring : "Search:",
									filterstringcomparisonoperators : [
											"empty", "not empty", "contains",
											"contains(match case)",
											"does not contain",
											"does not contain(match case)",
											"starts with",
											"starts with(match case)",
											"ends with",
											"ends with(match case)", "equal",
											"equal(match case)", "null",
											"not null" ],
									filternumericcomparisonoperators : [
											"equal", "not equal", "less than",
											"less than or equal",
											"greater than",
											"greater than or equal", "null",
											"not null" ],
									filterdatecomparisonoperators : [ "equal",
											"not equal", "less than",
											"less than or equal",
											"greater than",
											"greater than or equal", "null",
											"not null" ],
									filterbooleancomparisonoperators : [
											"equal", "not equal" ],
									validationstring : "Entered value is not valid",
									emptydatastring : "没有数据",
									filterselectstring : "Select Filter",
									loadtext : "Loading...",
									clearstring : "Clear",
									todaystring : "Today",
									loadingerrormessage : "The data is still loading and you cannot set a property or call a method. You can do that once the data binding is completed. jqxDataTable raises the 'bindingComplete' event when the binding is completed."
								}
							}
						},
						_updateScrollbars : function(k) {
							var n = false;
							if (this.width === "auto" || this.width === null
									|| this.autowidth) {
								if (this.maxWidth == 999999) {
									n = true
								}
							}
							var d = parseInt(this.scrollbarsize);
							var i = this.table ? this.table.height() : 0;
							var l = 0;
							var e = "visible";
							var h = this.vScrollBar[0].style.visibility;
							var j = this.hScrollBar[0].style.visibility;
							if (!k) {
								var g = this.host.height()
							} else {
								var g = k
							}
							if (!this.columngroups) {
								g -= this.showheader ? this.columnsheight : 0
							} else {
								g -= this.showheader ? this.columnsheader
										.height() : 0
							}
							if (this.filterable) {
								g -= this.filter.height()
							}
							if (this.pageable) {
								g -= this.pagerheight;
								if (this.pagerposition === "both") {
									g -= this.pagerheight
								}
							}
							if (this.showtoolbar) {
								g -= this.toolbarheight
							}
							if (this.showstatusbar) {
								g -= this.statusbarheight
							}
							if (this.showaggregates) {
								g -= this.aggregatesheight
							}
							var o = false;
							if (this.height === "auto" || this.height === null
									|| this.autoheight) {
								if (this.maxHeight == 999999) {
									o = true
								}
							}
							if (!o
									&& i > g
									&& (this.source.records.length > 0 || this.source.hierarchy.length > 0)) {
								this.vScrollBar[0].style.visibility = e;
								l = 4 + parseInt(d);
								this.vScrollBar.jqxScrollBar({
									max : i - g
								})
							} else {
								this.vScrollBar[0].style.visibility = "hidden"
							}
							if ((h != this.vScrollBar[0].style.visibility)) {
								this._updatecolumnwidths()
							}
							var m = this.table ? this.table.width() : 0;
							if (m > 3) {
								m -= 3
							}
							var c = parseInt(this.host.css("border-left-width"))
									+ parseInt(this.host
											.css("border-right-width"));
							var p = c + this.host.width() - l;
							if (m > p && !n) {
								this.hScrollBar[0].style.visibility = e;
								this.hScrollBar.jqxScrollBar({
									max : m - p
								});
								l = 4 + parseInt(d);
								if (!o) {
									if (i > g - l + 4
											&& (this.source.records.length > 0 || this.source.hierarchy.length > 0)) {
										this.hScrollBar.jqxScrollBar({
											max : c + m - p
										});
										var f = this.vScrollBar[0].style.visibility === "hidden";
										this.vScrollBar[0].style.visibility = e;
										this._updatecolumnwidths();
										if (f) {
											this.hScrollBar.jqxScrollBar({
												max : m - p + l + c
											})
										}
									}
									this.vScrollBar.jqxScrollBar({
										max : i - g + l
									})
								}
							} else {
								this.hScrollBar[0].style.visibility = "hidden"
							}
							if (this.source.records.length === 0
									&& (this.source.hierarchy && this.source.hierarchy.length === 0)) {
								this.vScrollBar[0].style.visibility = "hidden";
								this.bottomRight[0].style.visibility = "hidden"
							}
							if (this.vScrollBar[0].style.visibility == "hidden") {
								if (this.vScrollInstance.value != 0) {
									this.vScrollInstance.setPosition(0)
								}
							}
						},
						_measureElementWidth : function(e) {
							var d = b("<span style='visibility: hidden; white-space: nowrap;'>"
									+ e + "</span>");
							d.addClass(this.toTP("jqx-widget"));
							d.addClass(this.toTP("jqx-grid"));
							d.addClass(this.toTP("jqx-grid-column-header"));
							d.addClass(this.toTP("jqx-widget-header"));
							b(document.body).append(d);
							var c = d.outerWidth() + 20;
							d.remove();
							return c
						},
						_arrangeAutoHeight : function(e) {
							if (!e) {
								e = 0
							}
							if (this.height === "auto" || this.height === null
									|| this.autoheight) {
								var h = this.table.height();
								var g = 0;
								if (!this.columngroups) {
									g += this.showheader ? this.columnsheight
											: -1
								} else {
									g += this.showheader ? this.columnsheader
											.height() : -1
								}
								g += this.showstatusbar ? this.statusbarheight
										: 0;
								g += this.showaggregates ? this.aggregatesheight
										: 0;
								g += this.showtoolbar ? this.toolbarheight : 0;
								g += this.pageable ? this.pagerheight : 0;
								if (this.pagerposition === "both") {
									g += this.pageable ? this.pagerheight : 0
								}
								g += h;
								if (this.filterable) {
									var f = this.filter.find(".filterrow");
									var c = this.filter
											.find(".filterrow-hidden");
									var d = 1;
									if (c.length > 0) {
										d = 0
									}
									g += this.filterheight - 1
											+ this.filterheight * f.length * d
								}
								if (g + e > this.maxHeight) {
									this.host.height(this.maxHeight)
								} else {
									this.host.height(g + e + 7)  //zk modified
								}
								return true
							}
							return false
						},
						_arrangeAutoWidth : function(e) {
							if (!e) {
								e = 0
							}
							if (this.width === "auto" || this.width === null
									|| this.autowidth) {
								var d = 0;
								for (var f = 0; f < this.columns.records.length; f++) {
									var c = this.columns.records[f].width;
									if (this.columns.records[f].hidden) {
										continue
									}
									if (c == "auto") {
										c = this
												._measureElementWidth(this.columns.records[f].text);
										d += c
									} else {
										d += c
									}
								}
								width = d;
								if (width + e > this.maxWidth) {
									this.host.width(this.maxWidth)
								} else {
									this.host.width(width + e)
								}
								return true
							}
							return false
						},
						_measureTopAndHeight : function() {
							var d = this.host.height();
							var h = 0;
							if (this.showtoolbar) {
								h += this.toolbarheight;
								d -= parseInt(this.toolbarheight)
							}
							if (this.filterable) {
								var g = this.filter.find(".filterrow");
								var e = this.filter.find(".filterrow-hidden");
								var f = 1;
								if (e.length > 0) {
									f = 0
								}
								h += this.filterheight;
								d -= parseInt(this.filterheight);
								var c = f == 1 ? g.length : 0;
								h += this.filterheight * c;
								d -= this.filterheight * c
							}
							if (this.pageable && this.pagerposition != "bottom") {
								h += parseInt(this.pagerheight) + 1;
								if (d > this.pagerheight
										&& this.pagerposition === "both") {
									d -= parseInt(this.pagerheight)
								}
							}
							return {
								top : h,
								height : d
							}
						},
						_arrange : function() {
							if (!this.table) {
								return
							}
							this._arrangeAutoHeight();
							this._arrangeAutoWidth();
							var w = this.host.width();
							var s = this.host.height();
							var k = s;
							var j = this;
							if (this.pageable) {
								if (this.pagerposition === "bottom") {
									this.toppager[0].style.visibility = "hidden";
									this.pager[0].style.visibility = "inherit"
								} else {
									if (this.pagerposition === "both") {
										this.toppager[0].style.visibility = "inherit";
										this.pager[0].style.visibility = "inherit"
									} else {
										if (this.pagerposition === "top") {
											this.toppager[0].style.visibility = "inherit";
											this.pager[0].style.visibility = "hidden"
										}
									}
								}
							} else {
								this.toppager[0].style.visibility = "hidden";
								this.pager[0].style.visibility = "hidden"
							}
							var r = 0;
							if (this.showtoolbar) {
								this.toolbar.width(w);
								this.toolbar.height(this.toolbarheight - 1);
								this.toolbar.css("top", 0);
								r += this.toolbarheight;
								s -= parseInt(this.toolbarheight)
							} else {
								this.toolbar[0].style.height = "0px"
							}
							if (this.filterable) {
								this.filter.width(w);
								this.filter.css("top", r);
								var u = this.filter.find(".filterrow");
								var h = this.filter.find(".filterrow-hidden");
								var A = 1;
								if (h.length > 0) {
									A = 0
								}
								this.filter.height(this.filterheight - 1
										+ this.filterheight * u.length * A);
								r += this.filterheight;
								s -= parseInt(this.filterheight);
								var y = A == 1 ? u.length : 0;
								r += this.filterheight * y;
								s -= this.filterheight * y
							}
							if (this.showstatusbar) {
								this.statusbar.width(!this.table ? w : Math
										.max(w, this.table.width()));
								this.statusbar.height(this.statusbarheight - 1)
							} else {
								this.statusbar[0].style.height = "0px"
							}
							if (this.showaggregates) {
								this.aggregates
										.height(this.aggregatesheight - 1)
							} else {
								this.aggregates[0].style.height = "0px"
							}
							if (this.pageable && this.pagerposition != "bottom") {
								this.toppager[0].style.width = w + "px";
								this.toppager[0].style.height = parseInt(this.pagerheight)
										+ "px";
								this.toppager[0].style.top = parseInt(r) + "px";
								r += parseInt(this.pagerheight) + 1;
								if (s > this.pagerheight) {
									s -= parseInt(this.pagerheight)
								}
							} else {
								if (this.toppager[0].style.width != w + "px") {
									this.toppager[0].style.width = parseInt(w)
											+ "px"
								}
								if (this.toppager[0].style.height != this.pagerheight
										+ "px") {
									this.toppager[0].style.height = parseInt(this.pagerheight)
											+ "px"
								}
								if (this.toppager[0].style.top != r + "px") {
									this.toppager[0].style.top = r + "px"
								}
								var i = this.pagerposition != "bottom" ? this.pagerheight
										: 0;
								var d = r + i + "px";
								if (this.content[0].style.top != d) {
									this.content[0].style.top = r
											+ this.pagerheight + "px"
								}
							}
							this._updateScrollbars(k);
							var c = parseInt(this.scrollbarsize);
							var o = 4;
							var e = 2;
							var f = 0;
							if (this.vScrollBar[0].style.visibility == "visible") {
								f = c + o
							}
							if (this.hScrollBar[0].style.visibility == "visible") {
								e = c + o + 2
							}
							if (this.showaggregates) {
								if (this.hScrollBar[0].style.visibility === "hidden") {
									this.aggregates
											.width(!this.table ? w : Math.max(
													w, this.table.width()) + 4)
								} else {
									this.aggregates.width("auto")
								}
							}
							if ("hidden" != this.vScrollBar[0].style.visibility
									|| "hidden" != this.hScrollBar[0].style.visibility) {
								var x = this._arrangeAutoHeight(e - 2);
								var t = this._arrangeAutoWidth(f + 1);
								if (x || t) {
									var w = this.host.width();
									this.toppager[0].style.width = parseInt(w)
											+ "px";
									this.toolbar[0].style.width = parseInt(w)
											+ "px";
									this.statusbar[0].style.width = parseInt(w)
											+ "px";
									this.filter[0].style.width = parseInt(w)
											+ "px"
								}
								if (x) {
									var B = this._measureTopAndHeight();
									r = B.top;
									s = B.height
								}
							}
							var n = 0;
							if (this.pageable) {
								n = this.pagerheight;
								if (this.pagerposition != "top") {
									e += this.pagerheight
								}
							}
							if (this.showaggregates) {
								e += this.aggregatesheight;
								n += this.aggregatesheight
							}
							if (this.showstatusbar) {
								e += this.statusbarheight;
								n += this.statusbarheight
							}
							if (this.hScrollBar[0].style.height != c + "px") {
								this.hScrollBar[0].style.height = parseInt(c)
										+ "px"
							}
							if (this.hScrollBar[0].style.top != r + s - o - c
									- n + "px"
									|| this.hScrollBar[0].style.left != "0px") {
								this.hScrollBar[0].style.top = r + s - o - c
										- n - 1 + "px";
								this.hScrollBar[0].style.left = "0px"
							}
							var m = this.hScrollBar[0].style.width;
							var g = false;
							var z = false;
							if (f == 0) {
								if (m != (w - 2) + "px") {
									this.hScrollBar[0].style.width = (w - 2)
											+ "px";
									g = true
								}
							} else {
								if (m != (w - c - o) + "px") {
									this.hScrollBar[0].style.width = (w - c - o + "px");
									g = true
								}
							}
							if (this.vScrollBar[0].style.width != c + "px") {
								this.vScrollBar[0].style.width = c + "px";
								z = true
							}
							if (this.vScrollBar[0].style.height != parseInt(s)
									- e + "px") {
								this.vScrollBar[0].style.height = (parseInt(s)
										- e + "px");
								z = true
							}
							if (this.vScrollBar[0].style.left != parseInt(w)
									- parseInt(c) - o + "px"
									|| this.vScrollBar[0].style.top != r + "px") {
								this.vScrollBar[0].style.top = r + "px";
								this.vScrollBar[0].style.left = parseInt(w)
										- parseInt(c) - o + "px"
							}
							if (this.rtl) {
								this.vScrollBar.css({
									left : "0px",
									top : r
								});
								if (this.vScrollBar.css("visibility") != "hidden") {
									this.hScrollBar.css({
										left : c + 2
									})
								}
							}
							var l = this.vScrollInstance;
							l.disabled = this.disabled;
							var v = this.hScrollInstance;
							v.disabled = this.disabled;
							if (g) {
								v.refresh()
							}
							if (z) {
								l.refresh()
							}
							var p = function(C) {
								if ((C.vScrollBar[0].style.visibility == "visible")
										&& (C.hScrollBar[0].style.visibility == "visible")) {
									C.bottomRight[0].style.visibility = "visible";
									C.bottomRight[0].style.left = 1
											+ parseInt(C.vScrollBar.css("left"))
											+ "px";
									C.bottomRight[0].style.top = parseInt(C.hScrollBar
											.css("top"))
											+ "px";
									if (C.rtl) {
										C.bottomRight.css("left", "0px")
									}
									C.bottomRight[0].style.width = parseInt(c)
											+ 3 + "px";
									C.bottomRight[0].style.height = parseInt(c)
											+ 4 + "px";
									if (C.showaggregates) {
										C.bottomRight.css("z-index", 99);
										C.bottomRight.height(parseInt(c) + 4
												+ C.aggregatesheight);
										C.bottomRight.css({
											top : parseInt(C.hScrollBar
													.css("top"))
													- C.aggregatesheight
										})
									}
								} else {
									C.bottomRight[0].style.visibility = "hidden"
								}
							};
							p(this);
							if (this.content[0].style.width != w - f + "px") {
								this.content[0].style.width = w - f + "px"
							}
							//zk modified
							if (this.content[0].style.height != s - e + 3
									+ "px") {
								this.content[0].style.height = s - e + 3 + "px"
							}
							if (this.content[0].style.top != r + "px") {
								this.content[0].style.top = parseInt(r) + "px"
							}
							if (this.rtl) {
								this.content.css("left", f);
								if (this.table) {
									var q = this.table.width();
									if (q < w - f) {
										this.content.css("left", w - q + 2)
									}
								}
							}
							if (this.showaggregates) {
								this.aggregates
										.css(
												"top",
												r
														+ s
														- this.aggregatesheight
														- (this.pageable ? this.pagerheight
																: 0)
														- (this.showstatusbar ? (this.statusbarheight + 1)
																: 0));
								if (this.rtl) {
									this.aggregates.css("left", "0px")
								}
								if (this.hScrollBar.css("visibility") == "visible") {
									this.hScrollBar.css({
										top : r + s - o - c - n
												+ this.aggregatesheight + "px"
									});
									this.aggregates
											.css(
													"top",
													1
															+ r
															+ s
															- c
															- 5
															- this.aggregatesheight
															- (this.pageable ? this.pagerheight
																	: 0)
															- (this.showstatusbar ? (this.statusbarheight + 1)
																	: 0))
								}
								p(this)
							}
							if (this.showstatusbar) {
								this.statusbar
										.css(
												"top",
												r
														+ s
														- this.statusbarheight
														- (this.pageable ? this.pagerheight
																: 0));
								if (this.rtl) {
									if (this.hScrollBar.css("visibility") != "visible") {
										this.statusbar.css("left", this.content
												.css("left"))
									} else {
										this.statusbar.css("left", "0px")
									}
								}
							}
							if (this.pageable) {
								this.pager[0].style.width = w + "px";
								this.pager[0].style.height = this.pagerheight
										+ "px";
								this.pager[0].style.top = parseInt(r)
										+ parseInt(s)
										- parseInt(this.pagerheight) - 1 + "px"
							} else {
								this.pager[0].style.height = "0px"
							}
							this.vScrollBar[0].style.zIndex = this.tableZIndex
									+ this.headerZIndex + 10
									+ this.columns.records.length;
							this.hScrollBar[0].style.zIndex = this.tableZIndex
									+ this.headerZIndex + 10
									+ this.columns.records.length;
							if (w != parseInt(this.dataloadelement[0].style.width)) {
								this.dataloadelement[0].style.width = this.element.style.width
							}
							if (s != parseInt(this.dataloadelement[0].style.height)) {
								this.dataloadelement[0].style.height = this.element.style.height
							}
							this._hostwidth = w
						},
						scrolloffset : function(e, d) {
							if (arguments.length == 0
									|| (e != null && typeof (e) == "object" && !e.top)) {
								return {
									left : this.hScrollBar
											.jqxScrollBar("value"),
									top : this.vScrollBar.jqxScrollBar("value")
								}
							}
							if (e != null && typeof (e) == "object") {
								var d = e.left;
								var c = e.top;
								var e = c
							}
							if (e == null || d == null || e == undefined
									|| d == undefined) {
								return
							}
							this.vScrollBar.jqxScrollBar("setPosition", e);
							this.hScrollBar.jqxScrollBar("setPosition", d)
						},
						scrollleft : function(c) {
							if (c == null || c == undefined) {
								return
							}
							if (this.hScrollBar.css("visibility") != "hidden") {
								this.hScrollBar.jqxScrollBar("setPosition", c)
							}
						},
						scrolltop : function(c) {
							if (c == null || c == undefined) {
								return
							}
							if (this.vScrollBar.css("visibility") != "hidden") {
								this.vScrollBar.jqxScrollBar("setPosition", c)
							}
						},
						beginupdate : function() {
							this._updating = true;
							this._datachanged = false
						},
						endupdate : function(c) {
							this._updating = false;
							if (c === false) {
								return
							}
							this._rendercolumnheaders();
							this.refresh()
						},
						updating : function() {
							return this._updating
						},
						databind : function(g, i, c) {
							if (this.loadingstate === true) {
								return
							}
							if (this.host.css("display") == "block") {
								if (this.autoshowloadelement) {
									b(this.dataloadelement).css("visibility",
											"visible");
									b(this.dataloadelement).css("display",
											"block");
									this.dataloadelement.width(this.host
											.width());
									this.dataloadelement.height(this.host
											.height())
								} else {
									b(this.dataloadelement).css("visibility",
											"hidden");
									b(this.dataloadelement).css("display",
											"none")
								}
							}
							var f = this;
							if (g == null) {
								g = {}
							}
							if (g.sortcomparer == undefined
									|| g.sortcomparer == null) {
								g.sortcomparer = null
							}
							if (g.filter == undefined || g.filter == null) {
								g.filter = null
							}
							if (g.sort == undefined || g.sort == null) {
								g.sort = null
							}
							if (g.data == undefined || g.data == null) {
								g.data = null
							}
							var d = null;
							if (g != null) {
								d = g._source != undefined ? g._source.url
										: g.url
							}
							this.dataview = this.dataview
									|| new b.jqx.dataView();
							this.dataview.pageable = this.pageable;
							this.dataview.grid = this;
							if (!f.initializedcall) {
								if (g._source) {
									if (this.sortable) {
										if (g._source.sortcolumn != undefined) {
											this.sortcolumn = g._source.sortcolumn;
											this.source.sortcolumn = this.sortcolumn;
											this.dataview.sortfield = g._source.sortcolumn;
											g._source.sortcolumn = null
										}
										if (g._source.sortdirection != undefined) {
											this.dataview.sortfielddirection = g._source.sortdirection;
											var h = g._source.sortdirection;
											if (h == "a" || h == "asc"
													|| h == "ascending"
													|| h == true) {
												var e = true
											} else {
												var e = false
											}
											if (h != null) {
												this.sortdirection = {
													ascending : e,
													descending : !e
												}
											} else {
												this.sortdirection = {
													ascending : false,
													descending : false
												}
											}
										}
									}
								}
								if (this.pageable) {
									if (g._source) {
										if (g._source.pagenum != undefined) {
											this.dataview.pagenum = g._source.pagenum
										}
										if (g._source.pagesize != undefined) {
											this.pagesize = g._source.pagesize;
											this.dataview.pagesize = g._source.pagesize
										} else {
											this.dataview.pagesize = g._source.pagesize;
											if (this.dataview.pagesize == undefined) {
												this.dataview.pagesize = this.pagesize
											}
										}
									}
								}
								if (this.sortable) {
									if (g.sortcolumn) {
										this.dataview.sortfield = g.sortcolumn
									}
									if (g.sortdirection) {
										this.dataview.sortfielddirection = g.sortdirection
									}
								}
							}
							this._loading = true;
							this.dataview.update = function(x) {
								f._loading = false;
								f.rowsByKey = new Array();
								var m = f.source._source.datafields;
								if (f.groups && f.groups.length > 0) {
									var s = Object.prototype.toString;
									var u = f.groups[0];
									Object.prototype.toString = (typeof u == "function") ? u
											: function() {
												return this[u]
											};
									if (!f.source.records.sort) {
										var t = new Array();
										var r = 0;
										b.each(data, function() {
											t[startindex + r++] = this
										});
										data = t
									}
									f.source.records
											.sort(function(z, j) {
												if (z === undefined) {
													z = null
												}
												if (j === undefined) {
													j = null
												}
												if (z === null && j === null) {
													return 0
												}
												if (z === null && j !== null) {
													return -1
												}
												if (z !== null && j === null) {
													return 1
												}
												z = z.toString();
												j = j.toString();
												if (b.jqx.dataFormat
														.isNumber(z)
														&& b.jqx.dataFormat
																.isNumber(j)) {
													if (z < j) {
														return -1
													}
													if (z > j) {
														return 1
													}
													return 0
												} else {
													if (b.jqx.dataFormat
															.isDate(z)
															&& b.jqx.dataFormat
																	.isDate(j)) {
														if (z < j) {
															return -1
														}
														if (z > j) {
															return 1
														}
														return 0
													} else {
														if (!b.jqx.dataFormat
																.isNumber(z)
																&& !b.jqx.dataFormat
																		.isNumber(j)) {
															z = String(z)
																	.toLowerCase();
															j = String(j)
																	.toLowerCase()
														}
													}
												}
												try {
													if (z < j) {
														return -1
													}
													if (z > j) {
														return 1
													}
												} catch (A) {
													var B = A
												}
												return 0
											});
									Object.prototype.toString = s
								}
								for (var q = 0; q < f.source.records.length; q++) {
									var y = f.source.records[q];
									f.rowsByKey[y.uid] = y;
									if (y.records && y.records.length > 0) {
										var l = function(z) {
											for (var A = 0; A < z.length; A++) {
												if (!z[A]) {
													continue
												}
												f.rowsByKey[z[A].uid] = z[A];
												if (z[A].records
														&& z[A].records.length > 0) {
													l(z[A].records)
												}
											}
										};
										l(y.records)
									}
									if (q === 0) {
										var k = false;
										if (m) {
											for (var o = 0; o < m.length; o++) {
												if (!m[o].type) {
													k = true;
													m[o].type = "string";
													var w = y[m[o].name];
													if (w == undefined) {
														continue
													}
													if (w === true
															|| w === false) {
														m[o].type = "boolean"
													}
													if (w != null
															&& w
																	.toString()
																	.indexOf(
																			f.gridlocalization.currencysymbol) > -1
															|| w
																	.toString()
																	.indexOf(
																			f.gridlocalization.percentsymbol) > -1) {
														w = new Number(
																f
																		._toNumber(w
																				.toString()));
														if (!isNaN(w)) {
															m[o].type = "number"
														}
													}
													if (b.jqx.dataFormat
															.isNumber(w)
															|| (!isNaN(parseFloat(w)) && isFinite(w))) {
														m[o].type = "number"
													}
													if (b.jqx.dataFormat
															.isDate(w)) {
														m[o].type = "date"
													}
												}
											}
										}
										if (k) {
											for (var o = 0; o < m.length; o++) {
												var v = f.source
														.getvaluebytype(
																y[m[o].name],
																m[o]);
												if (v != null
														&& m[o].type == "number") {
													var p = v;
													p = new Number(
															f
																	._toNumber(p
																			.toString()));
													if (!isNaN(p)) {
														v = p
													}
												}
												y[m[o].name] = v
											}
										}
									}
								}
								if (i === "pager" || i === "filter"
										|| i === "sort") {
									f.refresh()
								} else {
									f._render()
								}
								if (f.autoshowloadelement && !f._loading) {
									b(f.dataloadelement).css("visibility",
											"hidden");
									b(f.dataloadelement).css("display", "none")
								}
								if (f.pageable) {
									if (!f.disabled) {
										if (f.pagernexttop) {
											f.pagerfirsttop.jqxButton({
												disabled : false
											});
											f.pagerfirstbottom.jqxButton({
												disabled : false
											});
											f.pagerlasttop.jqxButton({
												disabled : false
											});
											f.pagerlastbottom.jqxButton({
												disabled : false
											});
											f.pagernexttop.jqxButton({
												disabled : false
											});
											f.pagerprevioustop.jqxButton({
												disabled : false
											});
											if (f.pagershowrowscombotop.jqxDropDownList) {
												if (f.pagermode == "advanced") {
													f.pagershowrowscombotop
															.jqxDropDownList({
																disabled : false
															});
													f.pagershowrowscombobottom
															.jqxDropDownList({
																disabled : false
															})
												}
											}
											f.pagernextbottom.jqxButton({
												disabled : false
											});
											f.pagerpreviousbottom.jqxButton({
												disabled : false
											})
										}
									}
								}
								f._updateTouchScrolling();
								f._raiseEvent("bindingComplete");
								if (c) {
									c()
								}
								if (!f.initializedcall) {
									f.initializedcall = true;
									f.isInitialized = true;
									if (f.ready) {
										f.ready()
									}
									if ((f.width != null && f.width.toString()
											.indexOf("%") != -1)
											|| (f.height != null && f.height
													.toString().indexOf("%") != -1)) {
										f._updatesize(true)
									}
									if (f.host.css("visibility") == "hidden") {
										var n = b.jqx.browser.msie
												&& b.jqx.browser.version < 8;
										if (f.vScrollBar.css("visibility") == "visible") {
											f.vScrollBar.css("visibility",
													"inherit")
										}
										if (f.hScrollBar.css("visibility") == "visible") {
											f.hScrollBar.css("visibility",
													"inherit")
										}
										f._intervalTimer = setInterval(
												function() {
													if (f.host
															.css("visibility") == "visible") {
														f._updatesize(true);
														clearInterval(f._intervalTimer)
													}
												}, 100)
									}
								}
							};
							this.dataview.databind(g)
						},
						_raiseEvent : function(g, d) {
							if (d == undefined) {
								d = {
									owner : null
								}
							}
							var e = g;
							args = d;
							args.owner = this;
							var f = new jQuery.Event(e);
							f.owner = this;
							f.args = args;
							var c = this.host.trigger(f);
							d = f.args;
							return c
						},
						ensurecolumnvisible : function(d) {
							var g = 0;
							var c = 0;
							for (var f = 0; f < this.columns.records.length; f++) {
								if (this.columns.records[f].datafield != d) {
									g += this.columns.records[f].width
								} else {
									g += this.columns.records[f].width;
									c = this.columns.records[f].width;
									break
								}
							}
							if (this.hScrollBar.css("visibility") != "hidden") {
								var h = this.hScrollBar.jqxScrollBar("value");
								var e = h + this.host.width();
								if (h > g - c) {
									this.hScrollBar.jqxScrollBar("setPosition",
											g - c)
								} else {
									if (g > e) {
										this.hScrollBar.jqxScrollBar(
												"setPosition", h + g - e)
									}
								}
							}
						},
						ensurerowvisiblebykey : function(o) {
							if (this.vScrollBar[0].style.visibility === "hidden") {
								return false
							}
							var p = this._getuirow(o);
							if (!p) {
								return
							}
							var m = this.vScrollBar.jqxScrollBar("value");
							var e = this.host.height();
							var g = 0;
							if (!this.columngroups) {
								g += this.showheader ? this.columnsheight : 0
							} else {
								g += this.showheader ? this.columnsheader
										.height() : 0
							}
							if (this.filterable) {
								g += this.filter.height()
							}
							if (this.pageable) {
								if (this.pagerposition === "top") {
									g += this.pagerheight
								}
							}
							if (this.showtoolbar) {
								g += this.toolbarheight
							}
							e -= g;
							if (this.pageable && this.pagerposition !== "top") {
								e -= this.pagerheight
							}
							if (this.showstatusbar) {
								e -= this.statusbarheightt
							}
							if (this.showaggregates) {
								e -= this.aggregatesheight
							}
							if (this.hScrollBar.css("visibility") != "hidden") {
								e -= 20
							}
							var n = this.host.coord().top + g;
							var f = m;
							var c = e + f;
							var i = p.coord().top + m - n;
							i = Math.round(i);
							var l = i + p.outerHeight();
							l = Math.round(l);
							if (Math.round(p.position().top) === 0) {
								return this.vScrollBar.jqxScrollBar(
										"setPosition", 0)
							} else {
								var j = b(this._table.children()[1]).children().length - 1;
								var d = this._getuikey(j);
								var k = this._getuirow(d);
								if (k) {
									if (k[0] === p[0]) {
										return this.vScrollBar.jqxScrollBar(
												"setPosition", this.vScrollBar
														.jqxScrollBar("max"))
									}
								}
							}
							if (i < f) {
								var h = i - p.height();
								if (h < 0) {
									h = 0
								}
								return this.vScrollBar.jqxScrollBar(
										"setPosition", h)
							}
							if (l > c) {
								return this.vScrollBar.jqxScrollBar(
										"setPosition", 4 + l - e)
							}
						},
						ensurerowvisible : function(c) {
							var d = this._getkey(c);
							this.ensurerowvisiblebykey(d)
						},
						getcolumn : function(c) {
							var d = null;
							if (this.columns.records) {
								b.each(this.columns.records, function() {
									if (this.datafield == c
											|| this.displayfield == c) {
										d = this;
										return false
									}
								})
							}
							return d
						},
						_setcolumnproperty : function(d, f, g) {
							if (d == null || f == null || g == null) {
								return null
							}
							f = f.toLowerCase();
							var e = this.getcolumn(d);
							if (e == null) {
								return
							}
							var h = e[f];
							e[f] = g;
							var c = this.getcolumn(d);
							if (c != null) {
								c[f] = g
							}
							switch (f) {
							case "filteritems":
							case "text":
							case "editable":
							case "resizable":
							case "draggable":
							case "hidden":
							case "hideable":
							case "renderer":
							case "cellsrenderer":
							case "align":
							case "aggregates":
							case "cellsalign":
							case "cellsformat":
							case "pinned":
							case "contenttype":
							case "filterable":
							case "groupable":
							case "cellclass":
							case "cellclassname":
							case "class":
							case "width":
							case "minwidth":
							case "maxwidth":
								if (f == "align") {
									this._rendercolumnheaders();
									this.refresh()
								} else {
									if (f == "hidden" || f == "pinned"
											|| f == "resizable"
											|| f == "renderer") {
										this._rendercolumnheaders();
										this.refresh()
									} else {
										if (f == "width" || f == "maxwidth"
												|| f == "minwidth") {
											e._width = null;
											e._percentagewidth = null;
											this._updatecolumnwidths();
											this.refresh()
										} else {
											this.refresh()
										}
									}
								}
								break
							}
						},
						getcolumnproperty : function(c, e) {
							if (c == null || e == null) {
								return null
							}
							e = e.toLowerCase();
							var d = this.getcolumn(c);
							return d[e]
						},
						setcolumnproperty : function(c, d, e) {
							this._setcolumnproperty(c, d, e)
						},
						hidecolumn : function(c) {
							this._setcolumnproperty(c, "hidden", true)
						},
						showcolumn : function(c) {
							this._setcolumnproperty(c, "hidden", false)
						},
						updatebounddata : function(d, c) {
							this.databind(this.source, d, c)
						},
						refresh : function(c) {
							if (c != true) {
								if (b.jqx.isHidden(this.host)) {
									return
								}
								this.vScrollInstance.setPosition(0);
								this._renderrows();
								this.updatepagerdetails();
								this._arrange();
								this._renderhorizontalscroll();
								this._showicons();
								if (this.showaggregates) {
									this._updateaggregates()
								}
								this._updateTouchScrolling()
							}
						},
						_updateTouchScrolling : function() {
							var d = this.that;
							if (d.isTouchDevice()) {
								var f = b.jqx.mobile
										.getTouchEventName("touchstart");
								var e = b.jqx.mobile
										.getTouchEventName("touchend");
								var c = b.jqx.mobile
										.getTouchEventName("touchmove");
								if (d.gridcontent) {
									d.removeHandler(d.gridcontent, f
											+ ".touchScroll");
									d.removeHandler(d.gridcontent, c
											+ ".touchScroll");
									d.removeHandler(d.gridcontent, e
											+ ".touchScroll");
									d.removeHandler(d.gridcontent,
											"touchcancel.touchScroll");
									b.jqx.mobile
											.touchScroll(
													d.gridcontent[0],
													Math
															.max(
																	d.vScrollInstance.max,
																	d.hScrollInstance.max),
													function(i, h) {
														if (d.vScrollBar
																.css("visibility") == "visible") {
															var g = d.vScrollInstance.value;
															d.vScrollInstance
																	.setPosition(g
																			+ h)
														}
														if (d.hScrollBar
																.css("visibility") == "visible") {
															var g = d.hScrollInstance.value;
															d.hScrollInstance
																	.setPosition(g
																			+ i)
														}
														d.scrolled = new Date();
														d.vScrollInstance.thumbCapture = true
													}, this.element.id,
													this.hScrollBar,
													this.vScrollBar)
								}
							}
						},
						_showicons : function() {
							if (!this.table) {
								return
							}
							for (var e = 0; e < this.columns.records.length; e++) {
								var g = this.columns.records[e];
								b(g.filtericon).hide();
								b(g.sortasc).hide();
								b(g.sortdesc).hide();
								if (this.filtermode !== "simple") {
									for (var d = 0; d < this.dataview.filters.length; d++) {
										var f = this.dataview.filters[d];
										if (f.datafield === g.displayfield) {
											b(g.filtericon).show();
											break
										}
									}
								}
								if (this.sortcolumn !== null) {
									if (this.sortcolumn === g.displayfield) {
										if (this.sortdirection != null) {
											if (this.sortdirection.ascending) {
												b(g.sortasc).show()
											} else {
												b(g.sortdesc).show()
											}
										}
									}
								}
								if ((g.align != "left" && g.align != "center" && !this.rtl)
										|| (this.rtl && g.align != "right" && g.align != "center")) {
									var h = b.jqx.isHidden(b(g.filtericon)) ? 0
											: 16;
									h += b.jqx.isHidden(b(g.sortasc)) ? 0 : 16;
									h += b.jqx.isHidden(b(g.sortdesc)) ? 0 : 16;
									var c = b(b(b(g.element).children()[0])
											.children()[0]);
									if (!this.rtl) {
										if (h > 0) {
											c.css("margin-right", 4 + h + "px")
										} else {
											c.css("margin-right", "4px")
										}
									} else {
										if (h > 0) {
											c.css("margin-left", 4 + h + "px")
										} else {
											c.css("margin-left", "4px")
										}
									}
								}
							}
						},
						render : function(j) {
							var f = "<div style='overflow: hidden; -webkit-appearance: none; outline: none; width:100%; height: 100%; align:left; border: 0px; padding: 0px; margin: 0px; left: 0px; top: 0px; valign:top; position: relative;'><div id='wrapper"
									+ this.element.id
									+ "' style='overflow: hidden; -webkit-appearance: none; border: none; background: transparent; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; align:left; left: 0px; top: 0px; valign:top; position: relative;'><div id='toolbar' style='visibility: hidden; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='toppager' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='filter' style='visibility: hidden; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='content"
									+ this.element.id
									+ "' style='overflow: hidden; -webkit-appearance: none; border: none; background: transparent; outline: none; border: none; padding: 0px; margin-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='verticalScrollBar"
									+ this.element.id
									+ "' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='horizontalScrollBar"
									+ this.element.id
									+ "' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='bottomRight' style='align:left; valign:top; left: 0px; top: 0px; border: none; position: absolute;'></div><div id='aggregates' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='statusbar' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='pager' style='z-index: 20; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div></div></div>";
							this.element.innerText = "";
							this.element.innerHTML = f;
							this.wrapper = this.host.find("#wrapper"
									+ this.element.id);
							this.content = this.host.find("#content"
									+ this.element.id);
							this.content.addClass(this.toTP("jqx-reset"));
							var h = this.host.find("#verticalScrollBar"
									+ this.element.id);
							var l = this.host.find("#horizontalScrollBar"
									+ this.element.id);
							this.bottomRight = this.host
									.find("#bottomRight")
									.addClass(this.toTP("jqx-grid-bottomright"))
									.addClass(
											this
													.toTP("jqx-scrollbar-state-normal"));
							if (this.vScrollBar) {
								this.vScrollBar.jqxScrollBar("destroy")
							}
							if (this.hScrollBar) {
								this.hScrollBar.jqxScrollBar("destroy")
							}
							this.vScrollBar = h.jqxScrollBar({
								vertical : true,
								rtl : this.rtl,
								touchMode : this.touchmode,
								theme : this.theme,
								_triggervaluechanged : false
							});
							this.hScrollBar = l.jqxScrollBar({
								vertical : false,
								rtl : this.rtl,
								touchMode : this.touchmode,
								theme : this.theme,
								_triggervaluechanged : false
							});
							this.vScrollBar.css("visibility", "hidden");
							this.hScrollBar.css("visibility", "hidden");
							this.vScrollInstance = b.data(this.vScrollBar[0],
									"jqxScrollBar").instance;
							this.hScrollInstance = b.data(this.hScrollBar[0],
									"jqxScrollBar").instance;
							this.filter = this.host.find("#filter");
							this.filter[0].id = "filter" + this.element.id;
							this.filter
									.addClass(this.toTP("jqx-widget-header"));
							this.filter.addClass(this.toTP("jqx-grid-toolbar"));
							this.pager = this.host.find("#pager");
							this.pager[0].id = "pager" + this.element.id;
							this.toolbar = this.host.find("#toolbar");
							this.toolbar[0].id = "toolbar" + this.element.id;
							this.toolbar
									.addClass(this.toTP("jqx-grid-toolbar"));
							this.toolbar.addClass(this
									.toTP("jqx-widget-header"));
							this.aggregates = this.host.find("#aggregates");
							this.aggregates[0].id = "aggregates"
									+ this.element.id;
							this.aggregates.addClass(this
									.toTP("jqx-grid-statusbar"));
							this.aggregates.addClass(this
									.toTP("jqx-widget-header"));
							this.statusbar = this.host.find("#statusbar");
							this.statusbar[0].id = "statusbar"
									+ this.element.id;
							this.statusbar.addClass(this
									.toTP("jqx-grid-statusbar"));
							this.statusbar.addClass(this
									.toTP("jqx-widget-header"));
							this.pager.addClass(this.toTP("jqx-grid-pager"));
							this.pager.addClass(this.toTP("jqx-widget-header"));
							this.toppager = this.host.find("#toppager");
							this.toppager.addClass(this
									.toTP("jqx-grid-pager-top"));
							this.toppager.addClass(this
									.toTP("jqx-widget-header"));
							this.gridtable = null;
							if (this.localizestrings) {
								this.localizestrings();
								if (this.localization != null) {
									this.localizestrings(this.localization,
											false)
								}
							}
							this._builddataloadelement();
							this._cachedcolumns = this.columns;
							var c = this.source.datafields;
							if (c == null && this.source._source) {
								c = this.source._source.datafields
							}
							if (c) {
								for (var d = 0; d < this.columns.length; d++) {
									var e = this.columns[d];
									if (e && e.cellsformat
											&& e.cellsformat.length > 2) {
										for (var k = 0; k < c.length; k++) {
											if (c[k].name == e.datafield
													&& !c[k].format) {
												c[k].format = e.cellsformat;
												break
											}
										}
									}
								}
							}
							this.databind(this.source);
							if (this.showtoolbar) {
								this.toolbar.css("visibility", "visible")
							}
							if (this.showstatusbar) {
								this.statusbar.css("visibility", "visible")
							}
							if (this.showaggregates) {
								this.aggregates.css("visibility", "visible")
							}
							this.tableheight = null;
							var g = this;
							var i = function() {
								if (g.content) {
									g.content[0].scrollTop = 0;
									g.content[0].scrollLeft = 0
								}
								if (g.gridcontent) {
									g.gridcontent[0].scrollLeft = 0;
									g.gridcontent[0].scrollTop = 0
								}
							};
							this.removeHandler(this.content, "scroll");
							this.removeHandler(this.content, "mousedown");
							this.addHandler(this.content, "scroll",
									function(m) {
										i();
										return false
									});
							if (j !== true) {
								this._render()
							}
						},
						_render : function() {
							if (this.dataview == null) {
								return
							}
							if (this._loading) {
								return
							}
							if (this.columnsheight != 25 || this.columngroups) {
								this._measureElement("column")
							}
							if (this.filterable) {
								this.filter[0].style.visibility = "visible"
							} else {
								this.filter[0].style.visibility = "hidden"
							}
							this.rowinfo = new Array();
							this._removeHandlers();
							if (this.columns == null) {
								this.columns = new b.jqx.collection(
										this.element)
							} else {
								this._initializeColumns()
							}
							this.host.height(this.height);
							this.host.width(this.width);
							b.jqx.utilities.html(this.content, "");
							this.columnsheader = this.columnsheader
									|| b('<div style="overflow: hidden;"></div>');
							this.columnsheader.remove();
							this.columnsheader.addClass(this
									.toTP("jqx-widget-header"));
							this.columnsheader.addClass(this
									.toTP("jqx-grid-header"));
							if (!this.showheader) {
								this.columnsheader.css("display", "none")
							} else {
								if (this.columnsheader) {
									this.columnsheader.css("display", "block")
								}
							}
							this.gridcontent = this.gridcontent
									|| b('<div style="width: 100%; overflow: hidden; position: absolute;"></div>');
							this.gridcontent.remove();
							var c = this.columnsheight;
							c = this._preparecolumngroups();
							this.columnsheader.height(c);
							this.content.append(this.columnsheader);
							this.content.append(this.gridcontent);
							this._rendercolumnheaders();
							this.tableheight = null;
							this.gridcontent.find(
									"#contenttable" + this.element.id).remove();
							if (this.table != null) {
								this.table.remove();
								this.table = null
							}
							this.table = b('<div id="contenttable'
									+ this.element.id
									+ '" style="overflow: hidden; position: relative;"></div>');
							this.gridcontent.addClass(this
									.toTP("jqx-grid-content"));
							this.gridcontent.addClass(this
									.toTP("jqx-widget-content"));
							this.gridcontent.append(this.table);
							this._renderrows();
							if (this.filterable) {
								this._renderfilter()
							}
							if (this.pageable) {
								this._initpager()
							}
							this._arrange();
							if (this.renderstatusbar) {
								this.renderstatusbar(this.statusbar)
							}
							if (this.rendertoolbar) {
								this.rendertoolbar(this.toolbar)
							}
							if (this.showaggregates) {
								this._updateaggregates()
							}
							if (this.disabled) {
								this.host
										.addClass(this
												.toThemeProperty("jqx-fill-state-disabled"))
							}
							this._renderhorizontalscroll();
							this._showicons();
							this._addHandlers()
						},
						clear : function() {
							if (this.source) {
								this.source.records = new Array();
								this.source.hierarchy = new Array()
							}
							this.dataview._filteredData = new Array();
							this.databind(null);
							this._render()
						},
						_initpager : function() {
							var g = this;
							var c = this.gridlocalization.pagergotopagestring;
							var i = this.gridlocalization.pagerrangestring;
							var d = this.gridlocalization.pagershowrowsstring;
							var h = (this.pagerheight - 17) / 2;
							this.pagerdiv = this.pagerdiv
									|| b('<div style="width: 100%; height: 100%; position: relative;"></div>');
							this.toppagerdiv = this.toppagerdiv
									|| b('<div style="width: 100%; height: 100%; position: relative;"></div>');
							if (!this.pageable) {
								this.pagerdiv.remove();
								this.toppagerdiv.remove();
								return
							}
							if (!this.pagerrenderer) {
								this.pagerdiv.css("top", h);
								this.toppagerdiv.css("top", h);
								var f = function(s, E) {
									var n = this;
									var r = b('<div style="margin-right: 7px; width: 27px; height: 17px; float: right;"><input style="margin-top: 0px; text-align: right; width: 27px;" type="text"/></div>');
									var D = b('<div style="float: right; margin-right: 7px;"></div>');
									var t = b('<div type="button" style="padding: 0px; margin-top: 0px; margin-right: 3px; width: 27px; float: right;"></div>');
									var j = b('<div type="button" style="padding: 0px; margin-top: 0px; margin-right: 3px; width: 27px; float: right;"></div>');
									var m = b('<div type="button" style="margin-left: 3px; padding: 0px; margin-top: 0px; margin-right: 3px; width: 27px; float: right;"></div>');
									var q = b('<div type="button" style="padding: 0px; margin-top: 0px; margin-right: 3px; width: 27px; float: right;"></div>');
									var z = b('<div style="margin-right: 7px; float: right;"></div>');
									var x = b('<div style="margin-right: 7px; float: right;"></div>');
									var p = b('<div style="padding-bottom: 3px; margin-right: 3px; float: right;"></div>');
									r.attr("disabled", n.disabled);
									var A = b('<div id="gridpagerlist" style="margin-top: 0px; margin-right: 7px; float: right;"></div>');
									A[0].id = "gridpagerlist" + E
											+ n.element.id;
									n.removeHandler(t, "mousedown");
									n.removeHandler(t, "mouseup");
									n.removeHandler(t, "click");
									n.removeHandler(j, "mousedown");
									n.removeHandler(j, "mouseup");
									n.removeHandler(j, "click");
									n.removeHandler(m, "mousedown");
									n.removeHandler(m, "mouseup");
									n.removeHandler(m, "click");
									n.removeHandler(q, "mousedown");
									n.removeHandler(q, "mouseup");
									n.removeHandler(q, "click");
									if (!n.rtl) {
										j
												.attr(
														"title",
														n.gridlocalization.pagerpreviousbuttonstring);
										t
												.attr(
														"title",
														n.gridlocalization.pagernextbuttonstring)
									} else {
										t
												.attr(
														"title",
														n.gridlocalization.pagerpreviousbuttonstring);
										j
												.attr(
														"title",
														n.gridlocalization.pagernextbuttonstring)
									}
									if (b.jqx.browser.msie
											&& b.jqx.browser.version < 8) {
										p.css("padding-top", "3px")
									}
									this["pagerfirst" + E] = m;
									this["pagerlast" + E] = q;
									this["pagernext" + E] = t;
									this["pagerprevious" + E] = j;
									this["pagergotoinput" + E] = r;
									this["pagerdetails" + E] = z;
									this["pagershowrows" + E] = x;
									this["pagergotolabel" + E] = D;
									this["pagershowrowscombo" + E] = A;
									this["pagerbuttons" + E] = p;
									if (n.pagermode == "default") {
										if (!n.rtl) {
											m
													.attr(
															"title",
															n.gridlocalization.pagerfirstbuttonstring);
											q
													.attr(
															"title",
															n.gridlocalization.pagerlastbuttonstring)
										} else {
											q
													.attr(
															"title",
															n.gridlocalization.pagerfirstbuttonstring);
											m
													.attr(
															"title",
															n.gridlocalization.pagerlastbuttonstring)
										}
										var v = b("<div style='margin-left: 6px; width: 15px; height: 15px;'></div>");
										v
												.addClass(n
														.toThemeProperty("jqx-icon-arrow-first"));
										m.wrapInner(v);
										var o = b("<div style='margin-left: 6px; width: 15px; height: 15px;'></div>");
										o
												.addClass(n
														.toThemeProperty("jqx-icon-arrow-last"));
										q.wrapInner(o);
										if (!n.rtl) {
											s.append(m);
											s.append(j);
											s.append(p);
											s.append(t);
											s.append(q)
										} else {
											s.append(q);
											s.append(t);
											s.append(p);
											s.append(j);
											s.append(m)
										}
										q.jqxButton({
											cursor : "pointer",
											disabled : n.disabled,
											theme : n.theme
										});
										m.jqxButton({
											cursor : "pointer",
											disabled : n.disabled,
											theme : n.theme
										});
										var C = !n.rtl ? "left" : "right";
										p.css("float", C);
										q.css("float", C);
										m.css("float", C);
										t.css("float", C);
										j.css("float", C);
										z
												.css("float", n.rtl ? "left"
														: "right");
										if (n.rtl) {
											z.css("margin-left", "7px");
											z.css("margin-right", "0px")
										} else {
											z.css("margin-left", "0px");
											z.css("margin-right", "7px")
										}
									} else {
										if (!n.rtl) {
											s.append(t);
											s.append(j)
										}
									}
									t.jqxButton({
										cursor : "pointer",
										disabled : n.disabled,
										theme : n.theme
									});
									j.jqxButton({
										cursor : "pointer",
										disabled : n.disabled,
										theme : n.theme
									});
									var k = b("<div style='margin-left: 6px; width: 15px; height: 15px;'></div>");
									k
											.addClass(n
													.toThemeProperty("jqx-icon-arrow-left"));
									j.wrapInner(k);
									var l = b("<div style='margin-left: 6px; width: 15px; height: 15px;'></div>");
									l
											.addClass(n
													.toThemeProperty("jqx-icon-arrow-right"));
									t.wrapInner(l);
									if (!n.rtl) {
										s.append(z)
									}
									if (n.pagermode != "default") {
										if (!n.rtl) {
											s.append(A);
											s.append(x);
											s.append(r);
											s.append(D)
										} else {
											s.append(D);
											s.append(r);
											s.append(x);
											s.append(A);
											s.append(z);
											s.append(t);
											s.append(j)
										}
										var u = n.pagesizeoptions;
										A
												.jqxDropDownList({
													_checkForHiddenParent : false,
													rtl : n.rtl,
													disabled : n.disabled,
													source : u,
													enableBrowserBoundsDetection : true,
													keyboardSelection : false,
													autoDropDownHeight : true,
													width : 44,
													height : 16,
													theme : n.theme
												});
										var B = 0;
										for (var y = 0; y < u.length; y++) {
											if (this.pagesize >= u[y]) {
												B = y
											}
										}
										D[0].innerHTML = c;
										A.jqxDropDownList({
											selectedIndex : B
										});
										var w = r.find("input");
										w.addClass(n
												.toThemeProperty("jqx-input"));
										w
												.addClass(n
														.toThemeProperty("jqx-widget-content"));
										if (this.rtl) {
											w.css("direction", "rtl")
										}
										var n = this;
										this.removeHandler(A, "select");
										this
												.addHandler(
														A,
														"select",
														function(J) {
															if (J.args) {
																if (n.vScrollInstance) {
																	n.vScrollInstance
																			.setPosition(0)
																}
																var H = J.args.index;
																n.pagershowrowscombotop
																		.data().jqxDropDownList.instance
																		.selectIndex(H);
																n.pagershowrowscombobottom
																		.data().jqxDropDownList.instance
																		.selectIndex(H);
																n.pagershowrowscombobottom
																		.data().jqxDropDownList.instance
																		.renderSelection("mouse");
																n.pagershowrowscombotop
																		.data().jqxDropDownList.instance
																		.renderSelection("mouse");
																var K = n.dataview.pagenum
																		* n.dataview.pagesize;
																var I = u[H];
																var L = n.pagesize;
																n.pagesize = parseInt(I);
																if (isNaN(n.pagesize)) {
																	n.pagesize = 10
																}
																if (I >= 100) {
																	n.pagershowrowscombotop
																			.jqxDropDownList({
																				width : 55
																			});
																	n.pagershowrowscombobottom
																			.jqxDropDownList({
																				width : 55
																			})
																} else {
																	n.pagershowrowscombotop
																			.jqxDropDownList({
																				width : 44
																			});
																	n.pagershowrowscombobottom
																			.jqxDropDownList({
																				width : 44
																			})
																}
																n.dataview.pagesize = n.pagesize;
																var G = Math
																		.floor(K
																				/ n.dataview.pagesize);
																if (G !== n.dataview.pagenum
																		|| parseInt(I) !== parseInt(L)) {
																	n
																			._raiseEvent(
																					"pageSizeChanged",
																					{
																						pagenum : G,
																						oldpagesize : L,
																						pagesize : n.dataview.pagesize
																					});
																	var F = n
																			.gotopage(G);
																	if (!F) {
																		if (!n.serverProcessing) {
																			n
																					.refresh()
																		} else {
																			n
																					.updatebounddata("pager")
																		}
																	}
																}
															}
														});
										var r = r.find("input");
										r
												.addClass(n
														.toThemeProperty("jqx-grid-pager-input"));
										r.addClass(n
												.toThemeProperty("jqx-rc-all"));
										this.removeHandler(r, "keydown");
										this.removeHandler(r, "change");
										n.addHandler(r, "keydown", function(F) {
											if (F.keyCode >= 65
													&& F.keyCode <= 90) {
												return false
											}
											if (F.keyCode == "13") {
												var G = r.val();
												G = parseInt(G);
												if (!isNaN(G)) {
													n.gotopage(G - 1)
												}
												return false
											}
										});
										n.addHandler(r, "change", function() {
											var F = r.val();
											F = parseInt(F);
											if (!isNaN(F)) {
												n.gotopage(F - 1)
											}
										})
									}
									x[0].innerHTML = d;
									n
											.addHandler(
													t,
													"mouseenter",
													function() {
														l
																.addClass(n
																		.toThemeProperty("jqx-icon-arrow-right-hover"))
													});
									n
											.addHandler(
													j,
													"mouseenter",
													function() {
														k
																.addClass(n
																		.toThemeProperty("jqx-icon-arrow-left-hover"))
													});
									n
											.addHandler(
													t,
													"mouseleave",
													function() {
														l
																.removeClass(n
																		.toThemeProperty("jqx-icon-arrow-right-hover"))
													});
									n
											.addHandler(
													j,
													"mouseleave",
													function() {
														k
																.removeClass(n
																		.toThemeProperty("jqx-icon-arrow-left-hover"))
													});
									n
											.addHandler(
													t,
													"mousedown",
													function() {
														l
																.addClass(n
																		.toThemeProperty("jqx-icon-arrow-right-selected"))
													});
									n
											.addHandler(
													t,
													"mouseup",
													function() {
														l
																.removeClass(n
																		.toThemeProperty("jqx-icon-arrow-right-selected"))
													});
									n
											.addHandler(
													j,
													"mousedown",
													function() {
														k
																.addClass(n
																		.toThemeProperty("jqx-icon-arrow-left-selected"))
													});
									n
											.addHandler(
													j,
													"mouseup",
													function() {
														k
																.removeClass(n
																		.toThemeProperty("jqx-icon-arrow-left-selected"))
													});
									if (n.pagermode === "default") {
										n
												.addHandler(
														q,
														"mouseenter",
														function() {
															o
																	.addClass(n
																			.toThemeProperty("jqx-icon-arrow-last-hover"))
														});
										n
												.addHandler(
														m,
														"mouseenter",
														function() {
															v
																	.addClass(n
																			.toThemeProperty("jqx-icon-arrow-first-hover"))
														});
										n
												.addHandler(
														q,
														"mouseleave",
														function() {
															o
																	.removeClass(n
																			.toThemeProperty("jqx-icon-arrow-last-hover"))
														});
										n
												.addHandler(
														m,
														"mouseleave",
														function() {
															v
																	.removeClass(n
																			.toThemeProperty("jqx-icon-arrow-first-hover"))
														});
										n
												.addHandler(
														q,
														"mousedown",
														function() {
															o
																	.addClass(n
																			.toThemeProperty("jqx-icon-arrow-last-selected"))
														});
										n
												.addHandler(
														m,
														"mousedown",
														function() {
															v
																	.addClass(n
																			.toThemeProperty("jqx-icon-arrow-first-selected"))
														});
										n
												.addHandler(
														q,
														"mouseup",
														function() {
															o
																	.removeClass(n
																			.toThemeProperty("jqx-icon-arrow-last-selected"))
														});
										n
												.addHandler(
														m,
														"mouseup",
														function() {
															v
																	.removeClass(n
																			.toThemeProperty("jqx-icon-arrow-first-selected"))
														})
									}
									n
											.addHandler(
													b(document),
													"mouseup.pagerbuttons" + E
															+ this.element.id,
													function() {
														l
																.removeClass(n
																		.toThemeProperty("jqx-icon-arrow-right-selected"));
														k
																.removeClass(n
																		.toThemeProperty("jqx-icon-arrow-left-selected"));
														if (o) {
															o
																	.removeClass(n
																			.toThemeProperty("jqx-icon-arrow-last-selected"));
															v
																	.removeClass(n
																			.toThemeProperty("jqx-icon-arrow-first-selected"))
														}
													});
									n.addHandler(t, "click", function() {
										if (!t.jqxButton("disabled")) {
											if (!n.rtl) {
												n.gotonextpage()
											} else {
												n.gotoprevpage()
											}
										}
									});
									n.addHandler(j, "click", function() {
										if (!j.jqxButton("disabled")) {
											if (!n.rtl) {
												n.gotoprevpage()
											} else {
												n.gotonextpage()
											}
										}
									});
									if (this.pagermode === "default") {
										n
												.addHandler(
														m,
														"click",
														function() {
															if (!m
																	.jqxButton("disabled")) {
																if (!n.rtl) {
																	n
																			.gotopage(0)
																} else {
																	var G = n.dataview.totalrecords;
																	var F = Math
																			.ceil(G
																					/ n.pagesize);
																	n
																			.gotopage(F - 1)
																}
															}
														});
										n
												.addHandler(
														q,
														"click",
														function() {
															if (!q
																	.jqxButton("disabled")) {
																if (!n.rtl) {
																	var G = n.dataview.totalrecords;
																	var F = Math
																			.ceil(G
																					/ n.pagesize);
																	n
																			.gotopage(F - 1)
																} else {
																	n
																			.gotopage(0)
																}
															}
														})
									}
								};
								this.pagerdiv.children().remove();
								this.toppagerdiv.children().remove();
								f.call(this, this.pagerdiv, "bottom");
								f.call(this, this.toppagerdiv, "top");
								this.pager.append(this.pagerdiv);
								this.toppager.append(this.toppagerdiv);
								this.updatepagerdetails()
							} else {
								this.pagerdiv.children().remove();
								this.toppager.children().remove();
								var e = this.pagerrenderer();
								if (e != null) {
									this.pagerdiv.append(b(e))
								}
								this.pager.append(this.pagerdiv);
								var e = this.pagerrenderer();
								if (e != null) {
									this.toppagerdiv.append(b(e))
								}
								this.toppager.append(this.toppagerdiv)
							}
						},
						_updatepagertheme : function() {
						},
						gotopage : function(f, h) {
							if (this._loading) {
								return false
							}
							if (this.editKey != undefined) {
								if (this.editSettings.saveOnPageChange) {
									var e = this.endroweditbykey(this.editKey);
									if (!e) {
										return false
									}
								} else {
									return false
								}
							}
							if (f == null || f == undefined) {
								f = 0
							}
							if (f == -1) {
								f = 0
							}
							if (f < 0) {
								return false
							}
							var d = this.dataview.totalrecords;
							var g = this.dataview.pagenum;
							var c = Math.ceil(d / this.pagesize);
							if (f >= c) {
								if (this.dataview.totalrecords == 0) {
									this.dataview.pagenum = 0;
									this.updatepagerdetails()
								}
								if (f > 0) {
									f = c - 1
								}
							}
							if (this.dataview.pagenum != f) {
								if (this.pageable) {
									this.dataview.pagenum = f;
									this._raiseEvent("pageChanged", {
										pagenum : f,
										oldpagenum : g,
										pagesize : this.dataview.pagesize
									})
								}
								if (!this.serverProcessing) {
									this.refresh();
									if (h) {
										if (b.isFunction(h)) {
											h()
										}
									}
								} else {
									this.updatebounddata("pager", h)
								}
								return true
							}
							return false
						},
						gotoprevpage : function(e) {
							if (this.dataview.pagenum > 0) {
								return this.gotopage(this.dataview.pagenum - 1,
										e)
							} else {
								if (this.pagermode != "default"
										&& this.pagermode != "advanced") {
									var d = this.dataview.totalrecords;
									var c = Math.ceil(d / this.pagesize);
									return this.gotopage(c - 1, e)
								}
							}
							return false
						},
						gotonextpage : function(e) {
							var d = this.dataview.totalrecords;
							if (this.summaryrows) {
								d += this.summaryrows.length
							}
							var c = Math.ceil(d / this.pagesize);
							if (this.dataview.pagenum < c - 1) {
								return this.gotopage(this.dataview.pagenum + 1,
										e)
							} else {
								if (this.pagermode != "default"
										&& this.pagermode != "advanced") {
									return this.gotopage(0, e)
								}
							}
							return false
						},
						updatepagerdetails : function() {
							if (!this.pageable) {
								return
							}
							var j = this;
							if (!this.serverProcessing) {
								if (this.source.hierarchy) {
									var m = j._names();
									var g = 0;
									var r = function(y, w) {
										for (var x = 0; x < w.length; x++) {
											if (j.dataview.filters.length == 0) {
												w[x]._visible = true
											}
											if (w[x]._visible !== false) {
												g++
											}
											if (w[x].records
													&& (w[x][m.expanded] || w[x][m.leaf])) {
												if (w[x]._visible !== false) {
													r(y + 1, w[x].records);
													if (this.treeGrid
															&& b(this.treeGrid)
																	.jqxTreeGrid(
																			"showSubAggregates")) {
														if (y != 0) {
															g--
														}
													}
												}
											}
										}
									};
									r(0, this.dataview.rows);
									this.dataview.totalrecords = g
								} else {
									this.dataview.totalrecords = this.dataview.rows.length
								}
							}
							var d = this.dataview.pagenum * this.pagesize;
							var u = (this.dataview.pagenum + 1) * this.pagesize;
							if (u >= this.dataview.totalrecords) {
								u = this.dataview.totalrecords
							}
							var v = this.dataview.totalrecords;
							d++;
							var t = Math.ceil(v / this.dataview.pagesize);
							if (t >= 1) {
								t--
							}
							t++;
							if (this.pagermode != "default") {
								if (this["pagergotoinputbottom"]) {
									var k = this["pagergotoinputbottom"]
											.find("input");
									k.val(this.dataview.pagenum + 1);
									k.attr("title", "1 - " + t);
									k = this["pagergotoinputtop"].find("input");
									k.val(this.dataview.pagenum + 1);
									k.attr("title", "1 - " + t)
								}
							} else {
								var o = "";
								var n = this.pagerbuttonscount;
								if (n == 0 || !n) {
									n = 5
								}
								var s = 0;
								if (this.rtl) {
									s = n - 1
								}
								while ((this.rtl && s >= 0)
										|| (!this.rtl && s < n)) {
									var e = 1 + s;
									var p = this.dataview.pagenum / n;
									var f = Math.floor(p);
									e += f * n;
									var c = this.toTP("jqx-grid-pager-number");
									c += " " + this.toTP("jqx-rc-all");
									if (e > t && !this.rtl) {
										break
									} else {
										if (this.rtl && e > t) {
											s--;
											continue
										}
									}
									if (!this.rtl) {
										if (s == 0 && e > n) {
											o += "<a class='"
													+ c
													+ "' tabindex=-1 href='javascript:;' data-page='"
													+ (-1 + e) + "'>...</a>"
										}
									}
									if (this.dataview.pagenum === e - 1) {
										c += " "
												+ this
														.toTP("jqx-fill-state-pressed")
									}
									if (!this.rtl) {
										o += "<a class='"
												+ c
												+ "' tabindex=-1 href='javascript:;' data-page='"
												+ e + "'>" + e + "</a>";
										if (s === n - 1) {
											var c = this
													.toTP("jqx-grid-pager-number");
											if (t >= 1 + e) {
												o += "<a class='"
														+ c
														+ "' tabindex=-1 href='javascript:;' data-page='"
														+ (1 + e) + "'>...</a>"
											}
										}
									} else {
										if (s === n - 1) {
											var c = this
													.toTP("jqx-grid-pager-number");
											if (t >= 1 + e) {
												o += "<a class='"
														+ c
														+ "' tabindex=-1 href='javascript:;' data-page='"
														+ (1 + e) + "'>...</a>"
											}
										}
										if (this.dataview.pagenum === e - 1) {
											c += " "
													+ this
															.toTP("jqx-fill-state-pressed")
										}
										o += "<a class='"
												+ c
												+ "' tabindex=-1 href='javascript:;' data-page='"
												+ e + "'>" + e + "</a>"
									}
									if (this.rtl) {
										var c = this
												.toTP("jqx-grid-pager-number");
										if (s == 0 && e > n) {
											o += "<a class='"
													+ c
													+ "' tabindex=-1 href='javascript:;' data-page='"
													+ (-1 + e) + "'>...</a>"
										}
									}
									if (!this.rtl) {
										s++
									} else {
										s--
									}
								}
								if (!this["pagerbuttonsbottom"]) {
									return
								}
								var h = this["pagerbuttonsbottom"].find("a");
								this.removeHandler(h, "click");
								this.removeHandler(h, "mouseenter");
								this.removeHandler(h, "mouseleave");
								var h = this["pagerbuttonstop"].find("a");
								this.removeHandler(h, "click");
								this.removeHandler(h, "mouseenter");
								this.removeHandler(h, "mouseleave");
								this["pagerbuttonsbottom"][0].innerHTML = o;
								this["pagerbuttonstop"][0].innerHTML = o;
								if (this.disabled) {
									this.host.find(".jqx-grid-pager-number")
											.css("cursor", "default")
								}
								var q = function() {
									h.click(function(i) {
										if (j.disabled) {
											return
										}
										var w = b(i.target).attr("data-page");
										j.gotopage(parseInt(w) - 1)
									});
									h.mouseenter(function(i) {
										if (j.disabled) {
											return
										}
										b(i.target).addClass(
												j.toTP("jqx-fill-state-hover"))
									});
									h.mouseleave(function(i) {
										if (j.disabled) {
											return
										}
										b(i.target).removeClass(
												j.toTP("jqx-fill-state-hover"))
									})
								};
								if (this.pagerposition === "both"
										|| this.pagerposition === "bottom") {
									var h = this["pagerbuttonsbottom"]
											.find("a");
									q(h)
								}
								if (this.pagerposition === "both"
										|| this.pagerposition === "top") {
									var h = this["pagerbuttonstop"].find("a");
									q(h)
								}
							}
							if (u == 0 && u < d) {
								d = 0
							}
							if (this["pagerdetailsbottom"]) {
								if (!this.rtl) {
									this["pagerdetailsbottom"][0].innerHTML = d
											+ "-"
											+ u
											+ this.gridlocalization.pagerrangestring
											+ v;
									this["pagerdetailstop"][0].innerHTML = d
											+ "-"
											+ u
											+ this.gridlocalization.pagerrangestring
											+ v
								} else {
									this["pagerdetailsbottom"][0].innerHTML = v
											+ this.gridlocalization.pagerrangestring
											+ u + "-" + d;
									this["pagerdetailstop"][0].innerHTML = v
											+ this.gridlocalization.pagerrangestring
											+ u + "-" + d
								}
							}
							if (this.pagermode == "default") {
								var l = this["pagerbuttonsbottom"].width()
										+ b(this["pagerdetailsbottom"]).width()
										+ 160;
								this.pagerdiv.css("min-width", l);
								this.toppagerdiv.css("min-width", l)
							}
							if (d > u) {
								this.gotoprevpage()
							}
						},
						_preparecolumngroups : function() {
							var n = this.columnsheight;
							if (this.columngroups) {
								this.columnshierarchy = new Array();
								if (this.columngroups.length) {
									var m = this;
									for (var g = 0; g < this.columngroups.length; g++) {
										this.columngroups[g].parent = null;
										this.columngroups[g].groups = null
									}
									for (var g = 0; g < this.columns.records.length; g++) {
										this.columns.records[g].parent = null;
										this.columns.records[g].groups = null
									}
									var o = function(j) {
										for (var t = 0; t < m.columngroups.length; t++) {
											var u = m.columngroups[t];
											if (u.name === j) {
												return u
											}
										}
										return null
									};
									for (var g = 0; g < this.columngroups.length; g++) {
										var p = this.columngroups[g];
										if (!p.groups) {
											p.groups = null
										}
										if (p.parentGroup) {
											p.parentgroup = p.parentGroup
										}
										if (p.parentgroup) {
											var r = o(p.parentgroup);
											if (r) {
												p.parent = r;
												if (!r.groups) {
													r.groups = new Array()
												}
												if (r.groups.indexOf(p) === -1) {
													r.groups.push(p)
												}
											}
										}
									}
									for (var g = 0; g < this.columns.records.length; g++) {
										var p = this.columns.records[g];
										if (p.columngroup) {
											var r = o(p.columngroup);
											if (r) {
												if (!r.groups) {
													r.groups = new Array()
												}
												p.parent = r;
												if (r.groups.indexOf(p) === -1) {
													r.groups.push(p)
												}
											}
										}
									}
									var q = 0;
									for (var g = 0; g < this.columns.records.length; g++) {
										var p = this.columns.records[g];
										var d = p;
										p.level = 0;
										while (d.parent) {
											d = d.parent;
											p.level++
										}
										var d = p;
										var c = p.level;
										q = Math.max(q, p.level);
										while (d.parent) {
											d = d.parent;
											if (d) {
												d.level = --c
											}
										}
									}
									var l = function(x) {
										var w = new Array();
										if (x.columngroup) {
											w.push(x)
										}
										if (!x.groups) {
											return new Array()
										}
										for (var v = 0; v < x.groups.length; v++) {
											if (x.groups[v].columngroup) {
												w.push(x.groups[v])
											} else {
												if (x.groups[v].groups) {
													var u = l(x.groups[v]);
													for (var t = 0; t < u.length; t++) {
														w.push(u[t])
													}
												}
											}
										}
										return w
									};
									for (var g = 0; g < this.columngroups.length; g++) {
										var p = this.columngroups[g];
										var e = l(p);
										p.columns = e;
										var h = new Array();
										var s = 0;
										for (var f = 0; f < e.length; f++) {
											h.push(this.columns.records
													.indexOf(e[f]));
											if (e[f].pinned) {
												s++
											}
										}
										if (s != 0) {
											throw new Error(
													"jqxDataTable: Column Groups initialization Error. Please, check the initialization of the jqxDataTable's columns array. The columns in a column group cannot be pinned.")
										}
										h.sort(function(j, i) {
											j = parseInt(j);
											i = parseInt(i);
											if (j < i) {
												return -1
											}
											if (j > i) {
												return 1
											}
											return 0
										});
										for (var k = 1; k < h.length; k++) {
											if (h[k] != h[k - 1] + 1) {
												throw new Error(
														"jqxDataTable: Column Groups initialization Error. Please, check the initialization of the jqxDataTable's columns array. The columns in a column group are expected to be siblings in the columns array.");
												this.host.remove()
											}
										}
									}
								}
								this.columngroupslevel = 1 + q;
								n = this.columngroupslevel * this.columnsheight
							}
							return n
						},
						wheel : function(e, d) {
							if (d.autoheight
									&& d.hScrollBar.css("visibility") != "visible") {
								e.returnValue = true;
								return true
							}
							var f = 0;
							if (!e) {
								e = window.event
							}
							if (e.originalEvent && e.originalEvent.wheelDelta) {
								e.wheelDelta = e.originalEvent.wheelDelta
							}
							if (e.wheelDelta) {
								f = e.wheelDelta / 120
							} else {
								if (e.detail) {
									f = -e.detail / 3
								}
							}
							if (f) {
								var c = d._handleDelta(f);
								if (c) {
									if (e.preventDefault) {
										e.preventDefault()
									}
									if (e.originalEvent != null) {
										e.originalEvent.mouseHandled = true
									}
									if (e.stopPropagation != undefined) {
										e.stopPropagation()
									}
								}
								if (c) {
									c = false;
									e.returnValue = c;
									return c
								} else {
									return false
								}
							}
							if (e.preventDefault) {
								e.preventDefault()
							}
							e.returnValue = false
						},
						_handleDelta : function(e) {
							if (this.vScrollBar.css("visibility") != "hidden") {
								var d = this.vScrollInstance.value;
								if (e < 0) {
									this.vScrollInstance
											.setPosition(this.vScrollInstance.value + 2 * 10)
								} else {
									this.vScrollInstance
											.setPosition(this.vScrollInstance.value - 2 * 10)
								}
								var c = this.vScrollInstance.value;
								if (d != c) {
									return true
								}
							} else {
								if (this.hScrollBar.css("visibility") != "hidden") {
									var d = this.hScrollInstance.value;
									if (e > 0) {
										if (this.hScrollInstance.value > 2 * 10) {
											this.hScrollInstance
													.setPosition(this.hScrollInstance.value - 2 * 10)
										} else {
											this.hScrollInstance.setPosition(0)
										}
									} else {
										if (this.hScrollInstance.value < this.hScrollInstance.max) {
											this.hScrollInstance
													.setPosition(this.hScrollInstance.value + 2 * 10)
										} else {
											this.hScrollInstance
													.setPosition(this.hScrollInstance.max)
										}
									}
									var c = this.hScrollInstance.value;
									if (d != c) {
										return true
									}
								}
							}
							return false
						},
						_removeHandlers : function() {
							this.removeHandler(this.host, "focus");
							this.removeHandler(b(window), "jqxReady");
							if (this._mousewheelfunc) {
								this.removeHandler(this.host, "mousewheel",
										this._mousewheelfunc)
							}
							var c = "mousedown";
							if (this.isTouchDevice()) {
								c = b.jqx.mobile
										.getTouchEventName("touchstart")
							}
							this.removeHandler(this.host, "dragstart."
									+ this.element.id);
							this.removeHandler(this.host, "keydown");
							if (this.table) {
								this.removeHandler(this.table, "mouseleave");
								this.removeHandler(this.table, "mousemove");
								this.removeHandler(this.table, c);
								this.removeHandler(this.table, "selectstart."
										+ this.element.id);
								if (b.jqx.browser.msie
										&& b.jqx.browser.version < 9) {
									this.removeHandler(this.table, "dblclick")
								}
							}
						},
						_addHandlers : function() {
							var e = this;
							this._mousewheelfunc = this._mousewheelfunc
									|| function(h) {
										e.wheel(h, e);
										return false
									};
							this.addHandler(this.host, "dragstart."
									+ this.element.id, function(h) {
								return false
							});
							this.addHandler(this.table, "selectstart."
									+ this.element.id, function(h) {
								if (e.enablebrowserselection) {
									return true
								}
								if (e.filterable) {
									if (b(h.target).ischildof(e.filterrow)) {
										return true
									}
								}
								if (e.rowdetails) {
									if (b(h.target).parents(
											"[data-role=details]").length > 0) {
										return true
									}
								}
								if (undefined == e.editKey) {
									return false
								}
							});
							this.addHandler(b(window), "jqxReady", function() {
								e._updatecolumnwidths();
								e.refresh()
							});
							if (this.editable) {
								this
										.addHandler(
												b(document),
												"mousedown.gridedit"
														+ this.element.id,
												function(j) {
													if (e.editable
															&& e.editSettings.saveOnBlur) {
														if (e.editKey != null) {
															if (!e.vScrollInstance
																	.isScrolling()
																	&& !e.vScrollInstance
																			.isScrolling()) {
																var r = e.host
																		.coord();
																var o = e.host
																		.width();
																var k = e.host
																		.height();
																var t = false;
																var h = false;
																var s = false;
																if (j.pageY < r.top
																		|| j.pageY > r.top
																				+ k) {
																	t = true;
																	h = true
																}
																if (j.pageX < r.left
																		|| j.pageX > r.left
																				+ o) {
																	t = true;
																	s = true
																}
																if (t) {
																	var l = function(
																			x) {
																		var w = b(
																				x
																						.children()[0])
																				.data();
																		if (w
																				&& !w.jqxWidget) {
																			w = x
																					.data()
																		}
																		if (!w) {
																			w = x
																					.data()
																		}
																		if (w.jqxWidget
																				&& w.jqxWidget.container
																				&& w.jqxWidget.container[0].style.display == "block") {
																			var i = w.jqxWidget;
																			var y = i.container
																					.coord().top;
																			var v = i.container
																					.coord().top
																					+ i.container
																							.height();
																			if (h
																					&& (j.pageY < y || j.pageY > v)) {
																				t = true;
																				i
																						.close();
																				return true
																			} else {
																				return false
																			}
																		}
																	};
																	var q = e._editors;
																	if (q) {
																		for (var m = 0; m < q.length; m++) {
																			var n = q[m].editor;
																			var u = l(n);
																			var p = n
																					.attr("aria-owns");
																			if (p) {
																				if (p == document.activeElement.id) {
																					return true
																				}
																				if (b(
																						document.activeElement)
																						.ischildof(
																								b("#"
																										+ p))) {
																					return true
																				}
																			} else {
																				p = n
																						.children()
																						.attr(
																								"aria-owns");
																				if (p) {
																					if (p == document.activeElement.id) {
																						return true
																					}
																					if (b(
																							document.activeElement)
																							.ischildof(
																									b("#"
																											+ p))) {
																						return true
																					}
																				}
																			}
																			if (u === false) {
																				return
																			}
																		}
																	}
																}
																if (t) {
																	e
																			.endroweditbykey(e.editKey)
																}
															}
														}
													}
												})
							}
							this.removeHandler(this.host, "mousewheel",
									this._mousewheelfunc);
							this.addHandler(this.host, "mousewheel",
									this._mousewheelfunc);
							this.addHandler(this.host, "focus", function(h) {
								if (h.preventDefault) {
									h.preventDefault()
								}
							});
							this.vScrollInstance.valuechanged = function(h) {
								if (e._timer) {
									clearTimeout(e._timer)
								}
								e._timer = setTimeout(function() {
									if (e.table) {
										e.table[0].style.top = 0
												- e.vScrollInstance.value
												+ "px"
									}
								}, 5)
							};
							this.hScrollInstance.valuechanged = function(h) {
								if (e._timer) {
									clearTimeout(e._timer)
								}
								e._timer = setTimeout(function() {
									if (e.table) {
										e._renderhorizontalscroll()
									}
								}, 5)
							};
							var d = "mousedown";
							if (this.isTouchDevice()) {
								d = b.jqx.mobile.getTouchEventName("touchend");
								if (b.jqx.browser.msie
										&& b.jqx.browser.version < 10) {
									d = "mousedown"
								}
							}
							var g = function(r, q) {
								var l = null;
								var m = e._table.coord();
								var t = m.top;
								var z = m.left;
								var A = e._table[0].rows;
								for (var n = 0; n < A.length; n++) {
									var w = A[n];
									var v = w.cells;
									for (var o = 0; o < v.length; o++) {
										var s = v[o];
										var k = s.offsetLeft + z;
										var p = s.offsetTop + t;
										var h = s.offsetWidth;
										var u = s.offsetHeight;
										if (h === 0 || u === 0) {
											continue
										}
										if (p <= q && q < p + u) {
											if (k <= r && r < k + h) {
												l = s;
												break
											}
										} else {
											break
										}
									}
								}
								return l
							};
							var c = function() {
								if (e.hoveredRow) {
									var i = e.hoveredRow[0].cells;
									var h = function(l) {
										for (var m = 0; m < l.length; m++) {
											var k = l[m];
											var n = k.className;
											n = n
													.replace(
															" "
																	+ e
																			.toTP("jqx-fill-state-hover"),
															"");
											n = n
													.replace(
															" "
																	+ e
																			.toTP("jqx-grid-cell-hover"),
															"");
											k.className = n
										}
									};
									h(i);
									if (e._pinnedTable && i.length > 0) {
										var j = e._pinnedTable[0].rows[e.hoveredRow[0].rowIndex].cells;
										h(j)
									}
								}
								e.hoveredRow = null
							};
							this.addHandler(this.table, "mouseleave", function(
									h) {
								c();
								if (e.wrapper) {
									e.wrapper.parent()
											.removeAttr("tabindex", 0);
									e.wrapper.removeAttr("tabindex", 1);
									e.content.removeAttr("tabindex", 2)
								}
							});
							var f = function(n) {
								if (!e.enablehover) {
									return true
								}
								e.hoveredRow = n;
								var k = n[0].cells;
								var m = e.rowdetails && !e.treeGrid;
								var p = m && !e.treeGrid ? 1 : 0;
								var j = 0;
								if (p > 0 && e.rtl) {
									p = 0;
									j = 1
								}
								for (var l = p; l < k.length - j; l++) {
									var h = k[l];
									h.className += " "
											+ e.toTP("jqx-fill-state-hover")
											+ " "
											+ e.toTP("jqx-grid-cell-hover")
								}
								if (e._pinnedTable) {
									if (e._pinnedTable[0].rows.length) {
										var o = e._pinnedTable[0].rows[e.hoveredRow[0].rowIndex].cells;
										for (var l = p; l < o.length - j; l++) {
											var h = o[l];
											h.className += " "
													+ e
															.toTP("jqx-fill-state-hover")
													+ " "
													+ e
															.toTP("jqx-grid-cell-hover")
										}
									}
								}
							};
							if (e.isTouchDevice()) {
								e.enablehover = false
							}
							this
									.addHandler(
											this.table,
											"mousemove",
											function(i) {
												var h = i.pageX;
												var k = i.pageY;
												if (e.disabled) {
													return true
												}
												if (!e.enablehover) {
													return true
												}
												if (e.hScrollInstance
														.isScrolling()
														|| e.vScrollInstance
																.isScrolling()) {
													return true
												}
												td = g(h, k);
												if (!td) {
													return true
												}
												var j = b(td).parent();
												c();
												if (e.rowdetails && e.treeGrid) {
													if (j.attr("data-role") == "row-details") {
														return true
													}
												}
												if (e.renderedRecords
														&& e.renderedRecords.length === 0) {
													return true
												}
												if (e.editKey != null) {
													if (e.editKey === j
															.attr("data-key")) {
														return true
													}
												}
												f(j);
												return true
											});
							this.addHandler(this.host, "keydown", function(h) {
								return e._handleKey(h)
							});
							if (b.jqx.browser.msie && b.jqx.browser.version < 9) {
								this.addHandler(this.table, "dblclick",
										function(h) {
											e.table.trigger("mousedown", h)
										})
							}
							this
									.addHandler(
											this.table,
											d,
											function(A) {
												var C = A.target;
												var p = null;
												if (e.disabled) {
													return true
												}
												var h = e.table.coord();
												var r = A.pageX;
												var q = A.pageY;
												if (b.jqx.browser.msie
														&& b.jqx.browser.version < 9) {
													if (arguments
															&& arguments.length == 2) {
														r = arguments[1].pageX;
														q = arguments[1].pageY
													}
												}
												if (e.isTouchDevice()) {
													var D = b.jqx.position(A);
													r = D.left;
													q = D.top;
													if (isNaN(r) || isNaN(q)) {
														var D = b.jqx
																.position(A.originalEvent);
														r = D.left;
														q = D.top
													}
												}
												p = g(r, q);
												var n = b(p).parent();
												var E = n.attr("data-key");
												if (e.rowdetails && e.treeGrid) {
													if (n.attr("data-role") == "row-details") {
														return true
													}
												}
												var u = function() {
													if (!e.enablebrowserselection) {
														if (A.preventDefault) {
															A.preventDefault()
														}
													}
													var x = b(document)
															.scrollTop();
													e.host.focus();
													b(document).scrollTop(x)
												};
												if (E !== undefined) {
													if (E == e.editKey) {
														if (e.editSettings.editSingleCell) {
															if (e.clickedTD == p) {
																return true
															} else {
																if (e.editKey != null
																		&& e.editSettings.saveOnSelectionChange) {
																	var t = e
																			.endroweditbykey(e.editKey);
																	if (!t) {
																		return true
																	}
																}
															}
														} else {
															return true
														}
													} else {
														if (e.editKey != null
																&& e.editSettings.saveOnSelectionChange) {
															var t = e
																	.endroweditbykey(e.editKey);
															if (!t) {
																return true
															}
														}
													}
													e.clickedTD = p;
													var k = e.rowinfo[E];
													if (k && k.group) {
														return true
													}
													var z = false;
													if (k) {
														var B = e
																.getrowdisplayindex(k.row);
														var s = e
																.getrowindex(k.row);
														e
																._raiseEvent(
																		"rowClick",
																		{
																			index : B,
																			boundIndex : s,
																			key : E,
																			row : k.row,
																			originalEvent : A
																		});
														var o = new Date()
																.getTime();
														var v = 300;
														if (!e.clickTime) {
															e.clickTime = new Date()
														}
														if (e._lastSelectedKey == E
																&& (o
																		- e.clickTime
																				.getTime() < v)) {
															e
																	._raiseEvent(
																			"rowDoubleClick",
																			{
																				index : B,
																				boundIndex : s,
																				key : E,
																				row : k.row,
																				originalEvent : A
																			});
															z = true;
															if (A.preventDefault) {
																A
																		.preventDefault()
															}
														}
													}
													e.clickTime = new Date();
													if (p.className
															.indexOf("jqx-grid-group") >= 0) {
														if (!k.expanded) {
															e
																	.showdetailsbykey(E)
														} else {
															e
																	.hidedetailsbykey(E)
														}
													} else {
														if (A.target
																&& A.target.className
																		.indexOf("jqx-grid-group") >= 0
																&& e.treeGrid) {
															if (!k.expanded) {
																e.treeGrid
																		.expandrow(E)
															} else {
																e.treeGrid
																		.collapserow(E)
															}
															f(e._getuirow(E))
														} else {
															if (A.target
																	&& A.target.className
																			.indexOf("checkbox") >= 0
																	&& e.treeGrid) {
																if (!k.checked) {
																	e.treeGrid
																			.checkrow(E)
																} else {
																	e.treeGrid
																			.uncheckrow(E)
																}
																f(e
																		._getuirow(E))
															} else {
																var l = b(p)
																		.index();
																var j = e.columns.records[l];
																if (e.editable
																		&& e.editKey == null) {
																	if (e._lastSelectedKey == E
																			&& e.editSettings.editOnDoubleClick
																			&& z) {
																		var t = e
																				.beginroweditbykey(
																						E,
																						j);
																		return true
																	}
																}
																if (e
																		.isTouchDevice()) {
																	if (e.scrolled
																			&& new Date()
																					- e.scrolled < 500) {
																		if (!e.enablebrowserselection) {
																			if (A.preventDefault) {
																				A
																						.preventDefault()
																			}
																		}
																		return false
																	}
																}
																if (e.selectionmode === "singlerow"
																		&& e.selectionmode !== "custom") {
																	e
																			.selectrowbykey(
																					E,
																					"mouse",
																					false);
																	e._lastSelectedKey = E;
																	e
																			._updateSelection();
																	if (A.preventDefault) {
																		A
																				.preventDefault()
																	}
																	u();
																	return true
																} else {
																	if (e.selectionmode !== "custom") {
																		if (!A.ctrlKey) {
																			e
																					.clearselection(false)
																		}
																		if (A.shiftKey) {
																			if (e._lastSelectedKey) {
																				var k = e.rowinfo[e._lastSelectedKey];
																				e
																						._doSelection(
																								e._lastSelectedKey,
																								true,
																								false);
																				var i = b(
																						e._table
																								.children()[1])
																						.children(
																								("[data-key="
																										+ e._lastSelectedKey + "]"));
																				var m = i
																						.index();
																				var w = n
																						.index();
																				e
																						._selectRange(
																								w,
																								m);
																				e
																						.selectrowbykey(
																								E,
																								"mouse",
																								false);
																				e
																						._updateSelection();
																				if (A.preventDefault) {
																					A
																							.preventDefault()
																				}
																				u();
																				return true
																			}
																		}
																	}
																	e._lastSelectedKey = E;
																	e.clickTime = new Date();
																	if (e.selectionmode !== "custom") {
																		if (k) {
																			if (k.selected) {
																				e
																						.unselectrowbykey(
																								E,
																								"mouse",
																								false)
																			} else {
																				e
																						.selectrowbykey(
																								E,
																								"mouse",
																								false)
																			}
																			u()
																		}
																	} else {
																		return true
																	}
																	e
																			._updateSelection();
																	if (!e.enablebrowserselection) {
																		if (A.preventDefault) {
																			A
																					.preventDefault()
																		}
																	}
																	return true
																}
															}
														}
													}
												}
											})
						},
						_updateSelection : function() {
							var l = this;
							var r = b(l._table.children()[1]).children();
							var n = l._pinnedTable ? b(
									l._pinnedTable.children()[1]).children()
									: null;
							var e = l.rowdetails && !l.treeGrid;
							var d = e ? 1 : 0;
							var f = 0;
							if (d > 0 && l.rtl) {
								d = 0;
								f = 1
							}
							for (var h = 0; h < r.length; h++) {
								var q = r[h].cells;
								if (n) {
									var c = n[h].cells
								}
								var p = null;
								if (r[h].getAttribute) {
									p = r[h].getAttribute("data-key")
								}
								if (l.rowinfo[p] && l.selectionmode !== "none") {
									if (l.rowinfo[p].selected) {
										for (var g = d; g < q.length - f; g++) {
											var o = q[g];
											b(o)
													.addClass(
															l
																	.toTP("jqx-grid-cell-selected")
																	+ " "
																	+ l
																			.toTP("jqx-fill-state-pressed"));
											if (c) {
												b(c[g])
														.addClass(
																l
																		.toTP("jqx-grid-cell-selected")
																		+ " "
																		+ l
																				.toTP("jqx-fill-state-pressed"))
											}
										}
									} else {
										for (var g = d; g < q.length - f; g++) {
											var o = q[g];
											if (c) {
												var k = c[g]
											}
											var m = o.className;
											m = m.replace(
													" jqx-fill-state-pressed",
													"");
											m = m.replace(
													" jqx-fill-state-pressed-"
															+ l.theme, "");
											m = m.replace(
													" jqx-grid-cell-selected",
													"");
											m = m.replace(
													" jqx-grid-cell-selected-"
															+ l.theme, "");
											o.className = m;
											if (k) {
												k.className = m
											}
										}
									}
								}
							}
						},
						_selectRange : function(f, e) {
							var c = b(b(this._table.children()[1]).children()[e]);
							var j = this;
							if (f > e) {
								var h = e;
								var d = c;
								while (h < f) {
									var d = d.next();
									var g = d.attr("data-key");
									j._doSelection(g, true, false);
									h++
								}
							} else {
								if (f < e) {
									var h = e;
									var d = c;
									while (h > f) {
										var d = d.prev();
										var g = d.attr("data-key");
										this._doSelection(g, true, false);
										h--
									}
								}
							}
						},
						_getuikey : function(d, g) {
							var f = null;
							var e = b(this._table.children()[1]).children();
							f = b(e[d]).attr("data-key");
							if (b(e[d]).attr("data-role")) {
								var c = b(e[d]);
								if (g == "next") {
									while (c) {
										c = c.next();
										if (c) {
											var h = c.attr("data-role");
											if (!h) {
												f = c.attr("data-key");
												return f
											}
										}
									}
								} else {
									if (g == "prev") {
										while (c) {
											c = c.prev();
											if (c) {
												var h = c.attr("data-role");
												if (!h) {
													f = c.attr("data-key");
													return f
												}
											}
										}
									}
								}
								return null
							}
							return f
						},
						getRows : function() {
							return this.source.records
						},
						getView : function() {
							var d = this._names();
							var e = new Array();
							var c = function(j, g) {
								if(g){  //zk modified
									for (var h = 0; h < g.length; h++) {
										if (g[h]._visible !== false) {
											var f = b.extend({}, g[h]);
											j.push(f);
											if (g[h][d.expanded]) {
												f.records = new Array();
												c(f.records, g[h].records)
											}
										}
									}
								}
							};
							c(e, this.dataViewRecords);
							return e
						},
						getKeys : function() {
							var d = new Array();
							var e = this.source.records;
							for (var c = 0; c < e.length; c++) {
								d.push(e[c].uid)
							}
							return d
						},
						getKey : function(c) {
							var d = this.getRows();
							if (d) {
								return d[c].uid
							} else {
								return -1
							}
						},
						_getkey : function(e) {
							if (this._loading) {
								throw new Error("jqxDataTable: "
										+ this.loadingerrormessage);
								return false
							}
							var f = null;
							var d = function() {
								var l = b(this._table.children()[1]).children();
								var k = null;
								var n = 0;
								if (this.pageable) {
									n -= this.dataview.pagenum
											* this.dataview.pagesize
								}
								if (this.groups.length > 0) {
									var h = 0;
									for (var j = 0; j < l.length; j++) {
										var o = b(l[j]);
										var m = o.children()[0]
												.getAttribute("colspan");
										if (m > 0) {
											continue
										}
										if (h === n + e) {
											k = o.attr("data-key");
											return k
										}
										h++
									}
									return k
								}
								if (this.rowdetails) {
									var h = 0;
									for (var j = 0; j < l.length; j++) {
										if (h === e + n) {
											k = b(l[j]).attr("data-key");
											return k
										}
										if (j % 2 == 1) {
											h++
										}
									}
								} else {
									k = b(l[n + e]).attr("data-key")
								}
								return k
							};
							f = d.call(this);
							if (f == null) {
								if (this.pageable) {
									var c = Math.floor(e
											/ this.dataview.pagesize);
									if (this.dataview.pagenum != c) {
										var g = this.getRows()[e];
										if (g && g.uid != null) {
											return g.uid
										} else {
											if (isNaN(c)) {
												return null
											}
											this.gotopage(c);
											f = d.call(this)
										}
									}
								}
							}
							return f
						},
						_getuirow : function(g) {
							try {
								var c = b(this._table.children()[1]).children(
										("[data-key=" + g + "]"));
								if (c.length > 0) {
									return c
								}
							} catch (e) {
								var d = b(this._table.children()[1]).children();
								for (var f = 0; f < d.length; f++) {
									var j = d[f];
									var h = j.getAttribute("data-key");
									if (g == h) {
										return b(j)
									}
								}
								return null
							}
							return null
						},
						_getpinneduirow : function(g) {
							if (!this._pinnedTable) {
								return null
							}
							try {
								var c = b(this._pinnedTable.children()[1])
										.children(("[data-key=" + g + "]"));
								if (c.length > 0) {
									return c
								}
							} catch (e) {
								var d = b(this._pinnedTable.children()[1])
										.children();
								for (var f = 0; f < d.length; f++) {
									var j = d[f];
									var h = j.getAttribute("data-key");
									if (g == h) {
										return b(j)
									}
								}
								return null
							}
							return null
						},
						_names : function() {
							var d = {
								leaf : "leaf",
								parent : "parent",
								expanded : "expanded",
								checked : "checked",
								selected : "selected",
								level : "level",
								icon : "icon",
								data : "data"
							};
							if (!this.source
									|| (this.source && !this.source._source.hierarchy)) {
								return d
							}
							var c = this.source._source.hierarchy.reservedNames;
							if (!c) {
								return d
							}
							return c
						},
						_getMatches : function(f, g) {
							if (f == undefined || f.length == 0) {
								return -1
							}
							var c = this.renderedRecords;
							if (g != undefined) {
								c = c.slice(g)
							}
							var e = 0;
							if (this.rowdetails && !this.treeGrid) {
								e++
							}
							if (e < this.columns.records.length) {
								var d = this.columns.records[e].datafield
							} else {
								new Array()
							}
							var h = new Array();
							b.each(c, function(k) {
								var l = this[d];
								if (!l) {
									l = ""
								}
								var j = b.jqx.string.startsWithIgnoreCase(l
										.toString(), f);
								if (j) {
									h.push(this.uid)
								}
							});
							return h
						},
						_handleKey : function(W) {
							if (this._loading) {
								return true
							}
							if (b(W.target).ischildof(this.filter)) {
								return true
							}
							if (b(W.target).ischildof(this.toolbar)) {
								return true
							}
							if (b(W.target).ischildof(this.statusbar)) {
								return true
							}
							var S = this._names();
							var H = this;
							var r = W.charCode ? W.charCode
									: W.keyCode ? W.keyCode : 0;
							var n = this._lastSelectedKey;
							var U = this.rowinfo[n];
							var u = this._getuirow(n);
							var w = W.shiftKey
									&& this.selectionmode != "singlerow";
							var P = W.ctrlKey;
							if (!u) {
								return
							}
							if (this.handlekeyboardnavigation) {
								var t = this.handlekeyboardnavigation(r);
								if (t) {
									return true
								}
							}
							if (this.editable && this.editKey == undefined
									&& r === 113 && this.editSettings.editOnF2) {
								this.beginroweditbykey(u.attr("data-key"))
							}
							if (this.editKey == undefined) {
								if (!P && !w && this.incrementalSearch
										&& (!(r >= 33 && r <= 40))) {
									var y = -1;
									if (!this._searchString) {
										this._searchString = ""
									}
									if ((r == 8 || r == 46)
											&& this._searchString.length >= 1) {
										this._searchString = this._searchString
												.substr(
														0,
														this._searchString.length - 1)
									}
									var e = String.fromCharCode(r);
									var G = (!isNaN(parseInt(e)));
									var I = false;
									if ((r >= 65 && r <= 97) || G || r == 8
											|| r == 32 || r == 46) {
										if (!W.shiftKey) {
											e = e.toLocaleLowerCase()
										}
										if (r != 8 && r != 32 && r != 46) {
											if (!(this._searchString.length > 0 && this._searchString
													.substr(0, 1) == e)) {
												this._searchString += e
											}
										}
										if (r == 32) {
											this._searchString += " "
										}
										this._searchTime = new Date();
										var n = this.getselection();
										if (n.length >= 1) {
											var s = n[0].uid;
											var B = -1;
											for (var R = 0; R < this.renderedRecords.length; R++) {
												if (this.renderedRecords[R].uid == s) {
													B = R;
													break
												}
											}
											var A = this._getMatches(
													this._searchString, B);
											if (A.length == 0
													|| (A.length > 0 && A[0] == s)) {
												var A = this
														._getMatches(this._searchString)
											}
										} else {
											var A = this
													._getMatches(this._searchString)
										}
										if (A.length > 0) {
											var n = this.getselection();
											if (n.length >= 1) {
												var c = A.indexOf(n[0].uid);
												if (c == -1) {
													this.clearselection(false);
													this.selectrowbykey(A[0])
												} else {
													var h = c + 1;
													if (h >= A.length) {
														h = 0
													}
													this.clearselection(false);
													this.selectrowbykey(A[h])
												}
											} else {
												this.clearselection(false);
												this.selectrowbykey(A[0])
											}
											this._lastSearchString = this._searchString
										}
									}
									if (this._searchTimer != undefined) {
										clearTimeout(this._searchTimer)
									}
									if (r == 27 || r == 13) {
										this._searchString = "";
										this._lastSearchString = ""
									}
									this._searchTimer = setTimeout(function() {
										H._searchString = "";
										H._lastSearchString = ""
									}, 500);
									if (y >= 0) {
										return
									}
									if (I) {
										return false
									}
								}
							}
							if (this.editKey != undefined) {
								if (r === 27 && this.editSettings.cancelOnEsc) {
									this.endroweditbykey(this.editKey, true)
								} else {
									if (r === 13
											&& this.editSettings.saveOnEnter) {
										if (W.target
												&& W.target.nodeName
														.toLowerCase() != "div"
												&& W.target.nodeName
														.toLowerCase() != "input") {
											return true
										}
										this.endroweditbykey(this.editKey,
												false)
									} else {
										if (this.editSettings.editSingleCell) {
											if (this.editColumn) {
												var O = this.columns.records
														.indexOf(this.editColumn);
												if (r == 9
														&& O < this.columns.records.length - 1
														&& !W.shiftKey) {
													var L = this.editKey;
													var x = null;
													for (var R = O + 1; R < this.columns.records.length; R++) {
														if (this.columns.records[R].editable
																&& !this.columns.records[R].hidden) {
															x = this.columns.records[R];
															break
														}
													}
													if (x) {
														this.endroweditbykey(
																this.editKey,
																false);
														this.beginroweditbykey(
																L, x)
													}
												} else {
													if (r == 9 && W.shiftKey
															&& O > 0) {
														var L = this.editKey;
														var D = null;
														for (var R = O - 1; R >= 0; R--) {
															if (this.columns.records[R].editable
																	&& !this.columns.records[R].hidden) {
																D = this.columns.records[R];
																break
															}
														}
														if (D) {
															this
																	.endroweditbykey(
																			this.editKey,
																			false);
															this
																	.beginroweditbykey(
																			L,
																			D)
														}
													}
												}
												if (r == 9) {
													var o = this.rowinfo[this.editKey];
													var B = this.getrowindex(o);
													var u = this
															._getuirow(this.editKey);
													if (!W.shiftKey && !x) {
														var M = null;
														for (var R = 0; R < this.columns.records.length; R++) {
															if (this.columns.records[R].editable
																	&& !this.columns.records[R].hidden) {
																M = this.columns.records[R];
																break
															}
														}
														if (M) {
															while (u) {
																u = u.next();
																if (u) {
																	var C = u
																			.attr("data-role");
																	if (!C) {
																		var E = u
																				.attr("data-key");
																		break
																	}
																}
															}
															if (E) {
																this
																		.clearselection(false);
																this._lastSelectedKey = E;
																var o = this.rowsByKey[E];
																var B = this
																		.getrowindex(o);
																var K = this
																		.getrowdisplayindex(o);
																this
																		._raiseEvent(
																				"rowSelect",
																				{
																					key : E,
																					index : K,
																					boundIndex : B,
																					row : this.rowsByKey[E]
																				});
																this
																		.endroweditbykey(
																				this.editKey,
																				false);
																this
																		._doSelection(
																				E,
																				true,
																				true);
																this
																		.beginroweditbykey(
																				E,
																				M)
															}
														}
													} else {
														if (!D && W.shiftKey) {
															var M = null;
															for (var R = this.columns.records.length - 1; R >= 0; R--) {
																if (this.columns.records[R].editable
																		&& !this.columns.records[R].hidden) {
																	M = this.columns.records[R];
																	break
																}
															}
															if (M) {
																while (u) {
																	u = u
																			.prev();
																	if (u) {
																		var C = u
																				.attr("data-role");
																		if (!C) {
																			var E = u
																					.attr("data-key");
																			break
																		}
																	}
																}
																if (E) {
																	this
																			.clearselection(false);
																	this._lastSelectedKey = E;
																	var o = this.rowsByKey[E];
																	var B = this
																			.getrowindex(o);
																	var K = this
																			.getrowdisplayindex(o);
																	this
																			._raiseEvent(
																					"rowSelect",
																					{
																						key : E,
																						index : K,
																						boundIndex : B,
																						row : this.rowsByKey[E]
																					});
																	this
																			.endroweditbykey(
																					this.editKey,
																					false);
																	this
																			._doSelection(
																					E,
																					true,
																					true);
																	this
																			.beginroweditbykey(
																					E,
																					M)
																}
															}
														}
													}
													return false
												}
											}
										}
									}
								}
								return true
							}
							if (W.ctrlKey) {
								var f = String.fromCharCode(r).toLowerCase();
								if (f == "c" || f == "x") {
									var n = this.getselection();
									if (n.length >= 1) {
										var v = "";
										for (var J = 0; J < this.renderedRecords.length; J++) {
											var X = this.renderedRecords[J];
											for (var R = 0; R < n.length; R++) {
												var o = n[R];
												if (o.uid === X.uid) {
													for (var Q = 0; Q < this.columns.records.length; Q++) {
														var z = this
																.getcelltextbykey(
																		o.uid,
																		this.columns.records[Q].displayfield);
														v += z;
														if (Q < this.columns.records.length - 1) {
															v += "\t"
														}
													}
													v += "\n";
													break
												}
											}
										}
										if (v != "") {
											v = v.substring(0, v.length - 2)
										}
										if (window.clipboardData) {
											window.clipboardData.setData(
													"Text", v)
										} else {
											var N = b('<textarea style="position: absolute; left: -1000px; top: -1000px;"/>');
											N.val(v);
											b("body").append(N);
											N.select();
											setTimeout(function() {
												document.designMode = "off";
												N.select();
												N.remove()
											}, 100)
										}
									}
								}
							}
							if (r === 32 && this.treeGrid) {
								if (this.treeGrid.checkboxes) {
									var n = this.getselection();
									if (n.length > 1) {
										for (var R = 0; R < n.length; R++) {
											var F = n[R].uid;
											if (this.rowinfo[F].checked) {
												this.treeGrid.uncheckrow(F,
														false)
											} else {
												this.treeGrid
														.checkrow(F, false)
											}
										}
										this._renderrows();
										return false
									} else {
										var s = u.attr("data-key");
										if (s) {
											if (this.rowinfo[s].checked) {
												this.treeGrid.uncheckrow(s)
											} else {
												this.treeGrid.checkrow(s)
											}
											return false
										}
									}
								}
							}
							var d = u.index();
							var V = function(Y) {
								var j = null;
								var p = b(H._table.children()[1]).children().length - 1;
								var i = b(b(H._table.children()[1]).children()[p]);
								var Z = i.attr("data-role");
								if (!Z) {
									j = i.attr("data-key")
								} else {
									while (i) {
										i = i.prev();
										if (i) {
											var Z = i.attr("data-role");
											if (!Z) {
												j = i.attr("data-key");
												break
											}
										}
									}
								}
								if (Y == "all") {
									return {
										row : i,
										key : j
									}
								}
								return j
							};
							var g = function(p) {
								var j = null;
								var i = b(b(H._table.children()[1]).children()[0]);
								var Y = i.attr("data-role");
								if (!Y) {
									j = i.attr("data-key")
								} else {
									while (i) {
										i = i.next();
										if (i) {
											var Y = i.attr("data-role");
											if (!Y) {
												j = i.attr("data-key");
												break
											}
										}
									}
								}
								if (p == "all") {
									return {
										row : i,
										key : j
									}
								}
								return j
							};
							var s = null;
							var l = function() {
								if (!P && !w) {
									H.clearselection(false)
								}
								if (r == 33 || r == 37) {
									var j = d;
									s = H._getuikey(j, "prev");
									if (!s) {
										s = g()
									}
								} else {
									if (r == 34 || r == 39) {
										var j = d;
										s = H._getuikey(j, "next");
										if (!s) {
											s = V()
										}
									} else {
										if (r == 38) {
											s = V()
										} else {
											if (r == 40) {
												s = g()
											}
										}
									}
								}
								H._lastSelectedKey = s;
								var p = H.rowsByKey[s];
								var j = H.getrowindex(p);
								var i = H.getrowdisplayindex(p);
								H._raiseEvent("rowSelect", {
									key : s,
									index : i,
									boundIndex : j,
									row : H.rowsByKey[s]
								});
								H._doSelection(s, true, true);
								H.host.focus()
							};
							var k = function() {
								H.clearselection(false);
								var i = g();
								if (w || P) {
									H._selectRange(u.index(), 0)
								} else {
									H._lastSelectedKey = i
								}
								H.selectrowbykey(i, "keyboard")
							};
							var q = function() {
								H.clearselection(false);
								var i = V("all");
								var j = i.key;
								if (w || P) {
									H._selectRange(u.index(), i.row.index())
								} else {
									H._lastSelectedKey = j
								}
								H.selectrowbykey(j, "keyboard")
							};
							if (this.treeGrid && this.rtl) {
								if (r == 37) {
									r = 39
								} else {
									if (r == 39) {
										r = 37
									}
								}
							}
							if (r == 36 || (P && r == 38)) {
								k();
								return false
							} else {
								if (r == 35 || (P && r == 40)) {
									q();
									return false
								} else {
									if (r == 33 || r == 37) {
										var s = u.attr("data-key");
										if (this.rowdetails && r == 37
												&& !this.treeGrid) {
											this.hidedetailsbykey(s);
											return false
										} else {
											if (this.treeGrid && r == 37) {
												if (this.rowinfo[s].row
														&& !this.rowinfo[s].row[S.parent]
														&& !this.rowinfo[s][S.leaf]
														&& !this.rowinfo[s].expanded) {
													return false
												}
												if (this.rowinfo[s].expanded
														&& !this.rowinfo[s][S.leaf]) {
													this.treeGrid
															.collapserow(s);
													return false
												} else {
													if (this.rowinfo[s].row
															&& this.rowinfo[s].row[S.parent]) {
														s = this.rowinfo[s].row[S.parent].uid
													}
												}
												if (this.rowinfo[s][S.leaf]) {
													return false
												}
											}
										}
										if (this.pageable && !this.treeGrid) {
											if (!this.rtl) {
												this.gotoprevpage(l)
											} else {
												this.gotonextpage(l)
											}
											return false
										}
										if (this.treeGrid && this.pageable
												&& r == 33) {
											this.gotoprevpage(l);
											return false
										}
									} else {
										if (r == 34 || r == 39) {
											var s = u.attr("data-key");
											if (this.rowdetails && r == 39
													&& !this.treeGrid) {
												this.showdetailsbykey(s);
												return false
											} else {
												if (this.treeGrid && r == 39) {
													if (this.rowinfo[s][S.leaf]) {
														return false
													}
													if (!this.rowinfo[s].expanded) {
														this.treeGrid
																.expandrow(s);
														return false
													} else {
														if (this.rowinfo[s].row
																&& this.rowinfo[s].row.records
																&& this.rowinfo[s].row.records.length > 0) {
															if (this.dataview.filters.length > 0) {
																var m = this.rowinfo[s].row.records;
																for (var R = 0; R < m.length; R++) {
																	if (m[R]._visible) {
																		s = m[R].uid;
																		break
																	}
																}
															} else {
																s = this.rowinfo[s].row.records[0].uid
															}
														}
													}
												}
											}
											if (this.pageable && !this.treeGrid) {
												if (!this.rtl) {
													this.gotonextpage(l)
												} else {
													this.gotoprevpage(l)
												}
												return false
											}
											if (this.treeGrid && this.pageable
													&& r == 34) {
												this.gotonextpage(l);
												return false
											}
										} else {
											if (r == 38) {
												while (u) {
													u = u.prev();
													if (u) {
														var C = u
																.attr("data-role");
														if (!C) {
															s = u
																	.attr("data-key");
															break
														}
													}
												}
												if (this.pageable && s == null) {
													this.gotoprevpage(l);
													return false
												}
											} else {
												if (r == 40) {
													while (u) {
														u = u.next();
														if (u) {
															var C = u
																	.attr("data-role");
															if (!C) {
																s = u
																		.attr("data-key");
																break
															}
														}
													}
													if (this.pageable
															&& s == null) {
														this.gotonextpage(l);
														return false
													}
												}
											}
										}
									}
								}
							}
							if (s != null) {
								if (!P && !w) {
									this.clearselection(false)
								}
								if (this.rowinfo[s]) {
									if (this.rowinfo[s].selected && (P || w)) {
										this._doSelection(
												this._lastSelectedKey, false,
												false);
										this._lastSelectedKey = s;
										var o = this.rowsByKey[s];
										var B = this.getrowindex(o);
										H._updateSelection();
										var K = this.getrowdisplayindex(o);
										this._raiseEvent("rowUnselect", {
											key : s,
											index : K,
											boundIndex : B,
											row : o
										});
										return false
									}
								}
								this._lastSelectedKey = s;
								var o = this.rowsByKey[s];
								var B = this.getrowindex(o);
								this._doSelection(s, true, false);
								H._updateSelection();
								var K = this.getrowdisplayindex(o);
								this._raiseEvent("rowSelect", {
									key : s,
									index : K,
									boundIndex : B,
									row : o
								});
								if (this.treeGrid) {
									if (r == 37) {
										var u = this._getuirow(s);
										var T = null;
										if (u) {
											var C = u.attr("data-role");
											if (!C) {
												T = u.attr("data-key")
											}
										}
										if (this.pageable && T == null
												&& this.dataview.pagenum > 0) {
											while (this._getuirow(s) == null
													&& this.dataview.pagenum > 0) {
												this.gotoprevpage()
											}
										}
									} else {
										if (r == 39) {
											var u = this._getuirow(s);
											var T = null;
											if (u) {
												var C = u.attr("data-role");
												if (!C) {
													T = u.attr("data-key")
												}
											}
											if (this.pageable && T == null) {
												this.gotonextpage()
											}
										}
									}
								}
								return false
							}
						},
						_selection : function(c) {
							if ("selectionStart" in c[0]) {
								var h = c[0];
								var i = h.selectionEnd - h.selectionStart;
								return {
									start : h.selectionStart,
									end : h.selectionEnd,
									length : i,
									text : h.value
								}
							} else {
								var f = document.selection.createRange();
								if (f == null) {
									return {
										start : 0,
										end : h.value.length,
										length : 0
									}
								}
								var d = c[0].createTextRange();
								var g = d.duplicate();
								d.moveToBookmark(f.getBookmark());
								g.setEndPoint("EndToStart", d);
								var i = f.text.length;
								return {
									start : g.text.length,
									end : g.text.length + f.text.length,
									length : i,
									text : f.text
								}
							}
						},
						_doSelection : function(c, e, d) {
							if (c == null) {
								this.clearselection();
								return
							}
							if (this.selectionmode === "singlerow") {
								this.clearselection(false)
							}
							var f = this.rowinfo[c];
							if (f) {
								f.selected = e;
								this.ensurerowvisiblebykey(c)
							} else {
								this.ensurerowvisiblebykey(c);
								var f = this.rowinfo[c];
								if (f) {
									f.selected = e
								} else {
									this.rowinfo[c] = {
										selected : e
									}
								}
							}
							if (this.selectionmode != "none") {
								if (d !== false) {
									this._renderrows()
								}
							}
						},
						clearselection : function(e) {
							if (this.rowinfo) {
								var f = this.getRows();
								for ( var h in this.rowinfo) {
									var g = this.rowinfo[h];
									if (g.selected) {
										g.selected = false;
										var d = f.indexOf(g.row);
										var c = this.getrowdisplayindex(g.row);
										this._raiseEvent("rowUnselect", {
											key : h,
											index : c,
											boundIndex : d,
											row : g.row
										})
									}
								}
							}
							if (e !== false) {
								this._renderrows()
							}
						},
						exportdata : function(s) {
							if (!b.jqx.dataAdapter.ArrayExporter) {
								if (!this.treeGrid) {
									throw "jqxDataTable: Missing reference to jqxdata.export.js!"
								}
								throw "jqxTreeGrid: Missing reference to jqxdata.export.js!"
							}
							var h = this.exportSettings.columnsHeader;
							if (h == undefined) {
								h = true
							}
							var v = this.exportSettings.hiddenColumns;
							if (v == undefined) {
								v = false
							}
							var O = this.exportSettings.serverURL;
							var H = this.exportSettings.characterSet;
							var aa = this.exportSettings.collapsedRecords;
							if (aa == undefined) {
								aa = false
							}
							var E = this.exportSettings.fileName;
							if (E === undefined) {
								E = this.treeGrid ? "jqxTreeGrid_Data"
										: "jqxDataTable_Data"
							}
							var r = this;
							var W = this.getRows();
							if (this.exportSettings.recordsInView == true) {
								W = this.getView()
							}
							if (this.groups && this.groups.length > 0) {
								var k = this.source.getGroupedRecords(
										this.groups, "records", "label", null,
										"data", null, "parent", W);
								var m = function(ac, ad) {
									for (var af = 0; af < ac.length; af++) {
										var j = b.extend({}, ac[af]);
										ad.push(j);
										if (j.records && j.records.length > 0) {
											var ag = m(j.records, new Array());
											for (var ae = 0; ae < ag.length; ae++) {
												if (ag[ae].leaf) {
													ad.push(ag[ae])
												} else {
													ad.push(ag[ae])
												}
											}
										}
									}
									return ad
								};
								var Q = m.call(this, k, new Array());
								W = Q
							}
							if (W.length == 0) {
								throw "No data to export."
							}
							this.exporting = true;
							if (this.altrows) {
								this._renderrows()
							}
							var o = new Array();
							for (var V = 0; V < this.columns.records.length; V++) {
								if (!v && this.columns.records[V].hidden) {
									continue
								}
								o.push(b.extend({}, this.columns.records[V]))
							}
							if (this.groups && this.groups.length > 0) {
								if (o.length > 0) {
									var Y = this._names();
									for (var V = 0; V < W.length; V++) {
										if (!W[V][Y.leaf]) {
											if (!r.rtl) {
												W[V][o[0].displayfield] = W[V].label
											} else {
												W[V][o[o.length - 1].displayfield] = W[V].label
											}
										}
									}
								}
							}
							var g = 0;
							if (this.treeGrid) {
								var K = this.treeGrid.getRows();
								if (this.exportSettings.recordsInView == true) {
									K = this.getView()
								}
								var Y = this._names();
								var d = function(ad) {
									for (var ae = 0; ae < ad.length; ae++) {
										var j = ad[ae];
										var ac = j[Y.expanded]
												|| (!j[Y.expanded] && aa);
										if (j[Y.leaf]) {
											g = Math.max(g, j[Y.level])
										}
										if (j.records && j.records.length > 0
												&& ac) {
											g = Math.max(g, j[Y.level]);
											d(ad[ae].records)
										}
									}
								};
								d(K);
								if (g != 0) {
									g++
								}
								if (s != "xml" && s != "json") {
									var t = o.length;
									for (var V = 0; V < g; V++) {
										var P = new a(this, this);
										P.width = this.indentwidth;
										P.datafield = "Level" + V;
										P.displayfield = "Level" + V;
										P.align = "center";
										P.cellsalign = "center";
										P.text = "";
										if (!this.rtl) {
											o.splice(V, 0, P)
										} else {
											o.splice(t, 0, P)
										}
									}
									var x = new Array();
									var w = this.source._source.hierarchy
											&& this.source._source.hierarchy.groupingDataFields ? true
											: false;
									var S = function(ae) {
										for (var ag = 0; ag < ae.length; ag++) {
											var ac = b.extend({}, ae[ag]);
											for (var af = 0; af < ac[Y.level]; af++) {
												ac["Level" + af] = ""
											}
											var ad = ac[Y.expanded]
													|| (!ac[Y.expanded] && aa);
											if (s == "xls" || s == "html") {
												if (ac.records
														&& ac.records.length > 0) {
													ac["Level" + ac[Y.level]] = ad ? "-"
															: "+"
												} else {
													ac["Level" + ac[Y.level]] = ""
												}
											} else {
												ac["Level" + ac[Y.level]] = ""
											}
											if (ac[Y.leaf]) {
												ac["Level" + ac[Y.level]] = ""
											}
											for (var af = ac[Y.level] + 1; af < g; af++) {
												ac["Level" + af] = ""
											}
											if (w && !ac[Y.leaf]) {
												if (!r.rtl) {
													ac[o[g].displayfield] = ac.label
												} else {
													ac[o[o.length - g - 1].displayfield] = ac.label
												}
											}
											if (ac.aggregate) {
												var ai = s == "xls" ? "AG" : "";
												for (var af = g; af < o.length; af++) {
													var ah = af;
													if (r.rtl) {
														ah = o.length - af - 1
													}
													if (ac[o[ah].displayfield] != undefined) {
														ac[o[ah].displayfield] = ai
																+ ac[o[ah].displayfield]
													}
												}
											}
											x.push(ac);
											if (ad && !ac[Y.leaf]) {
												S(ac.records)
											}
										}
									};
									S(K);
									W = x
								} else {
									W = K
								}
							}
							var f = v != undefined ? v : false;
							var X = {};
							var B = {};
							var l = [];
							var L = this.host.find(".jqx-grid-cell:first");
							var n = this.host.find(".jqx-grid-cell-alt:first");
							var ab = this.toThemeProperty;
							L.removeClass(ab("jqx-grid-cell-selected"));
							L.removeClass(ab("jqx-fill-state-pressed"));
							n.removeClass(ab("jqx-grid-cell-selected"));
							n.removeClass(ab("jqx-fill-state-pressed"));
							L.removeClass(ab("jqx-grid-cell-hover"));
							L.removeClass(ab("jqx-fill-state-hover"));
							n.removeClass(ab("jqx-grid-cell-hover"));
							n.removeClass(ab("jqx-fill-state-hover"));
							var D = "cell";
							var A = 1;
							var J = "column";
							var y = 1;
							var z = [];
							for (var T = 0; T < o.length; T++) {
								var P = o[T];
								if (P.cellclassname != "") {
									P.customCellStyles = new Array();
									if (typeof P.cellclassname == "string") {
										P.customCellStyles
												.push(P.cellclassname)
									} else {
										for (var V = 0; V < W.length; V++) {
											var c = V;
											var U = P.cellclassname(c,
													P.displayfield,
													W[V][P.displayfield], W[V]);
											if (U) {
												P.customCellStyles[V] = U
											}
										}
									}
								}
							}
							b
									.each(
											o,
											function(ae) {
												var ah = ae;
												if (ae >= g) {
													ah = o.length - g - 1
												} else {
													if (g > 0 && ae < g) {
														ah = 0
													}
												}
												var ai = b(r._table[0].rows[0].cells[ah]);
												if (r._table[0].rows.length > 1) {
													var j = b(r._table[0].rows[1].cells[ah]);
													if (j.length == 0) {
														var j = b(r._table[0].rows[1].cells[0])
													}
												}
												if (ai.length == 0) {
													var ai = b(r._table[0].rows[0].cells[0])
												}
												var ad = this;
												var af = function(ak) {
													var am = r.toThemeProperty;
													ak
															.removeClass(am("jqx-cell"));
													ak
															.removeClass(am("jqx-grid-cell-selected"));
													ak
															.removeClass(am("jqx-fill-state-pressed"));
													ak
															.removeClass(am("jqx-grid-cell-hover"));
													ak
															.removeClass(am("jqx-fill-state-hover"));
													if (ad.customCellStyles) {
														for ( var al in ad.customCellStyles) {
															ak
																	.removeClass(ad.customCellStyles[al])
														}
													}
												};
												af(ai);
												if (j) {
													af(j)
												}
												if (this.displayfield == null) {
													return true
												}
												if (r.showaggregates) {
													if (r.getcolumnaggregateddata) {
														z
																.push(r
																		.getcolumnaggregateddata(
																				this.displayfield,
																				this.aggregates,
																				true,
																				W))
													}
												}
												var ag = r
														._getexportcolumntype(this);
												if (this.exportable
														&& (!this.hidden || f)) {
													X[this.displayfield] = {};
													X[this.displayfield].text = this.text;
													X[this.displayfield].width = parseInt(this.width);
													if (isNaN(X[this.displayfield].width)) {
														X[this.displayfield].width = 60
													}
													X[this.displayfield].formatString = this.cellsformat;
													X[this.displayfield].localization = r.gridlocalization;
													X[this.displayfield].type = ag;
													X[this.displayfield].cellsAlign = this.cellsalign;
													X[this.displayfield].hidden = !h;
													X[this.displayfield].index = ah;
													X[this.displayfield].maxIndex = o.length
												}
												D = "cell" + A;
												var aj = this.element;
												if (s != "json" && s != "xml") {
													J = "column" + y;
													var i = function(ak, at,
															ar, al, aq, an, am,
															ao, ap) {
														B[ak] = {
															index : 1 + am,
															maxIndex : o.length
														};
														if (an.rtl) {
															B[ak].index = o.length
																	- am
														}
														if (s == "html"
																|| s == "xls"
																|| s == "pdf") {
															if (at) {
																B[ak]["font-size"] = at
																		.css("font-size");
																B[ak]["font-weight"] = at
																		.css("font-weight");
																B[ak]["font-style"] = at
																		.css("font-style");
																B[ak]["background-color"] = an
																		._getexportcolor(at
																				.css("background-color"));
																B[ak]["color"] = an
																		._getexportcolor(at
																				.css("color"));
																B[ak]["border-color"] = an
																		._getexportcolor(at
																				.css("border-top-color"))
															}
															if (ar) {
																B[ak]["text-align"] = aq.align
															} else {
																B[ak]["text-align"] = aq.cellsalign;
																B[ak]["formatString"] = aq.cellsformat;
																B[ak]["dataType"] = ag
															}
															if (s == "html"
																	|| s == "pdf") {
																B[ak]["border-top-width"] = "0px";
																if (!an.rtl) {
																	B[ak]["border-left-width"] = "0px";
																	B[ak]["border-right-width"] = "1px"
																} else {
																	B[ak]["border-left-width"] = "1px";
																	B[ak]["border-right-width"] = "0px";
																	if (am == o.length
																			- g
																			- 1
																			&& ar) {
																		B[ak]["border-right-width"] = "1px"
																	}
																}
																B[ak]["border-bottom-width"] = "1px";
																if (at) {
																	B[ak]["border-top-style"] = at
																			.css("border-top-style");
																	B[ak]["border-left-style"] = at
																			.css("border-left-style");
																	B[ak]["border-right-style"] = at
																			.css("border-right-style");
																	B[ak]["border-bottom-style"] = at
																			.css("border-bottom-style")
																}
																if (ar) {
																	if (am == 0
																			&& !an.rtl) {
																		B[ak]["border-left-width"] = "1px"
																	} else {
																		if (am == o.length - 1
																				&& an.rtl) {
																			B[ak]["border-right-width"] = "1px"
																		}
																	}
																	if (at) {
																		B[ak]["border-top-width"] = "1px";
																		B[ak]["border-bottom-width"] = at
																				.css("border-bottom-width")
																	}
																} else {
																	if (am == 0
																			&& !an.rtl) {
																		B[ak]["border-left-width"] = "1px"
																	} else {
																		if (am == o.length - 1
																				&& an.rtl) {
																			B[ak]["border-right-width"] = "1px"
																		}
																	}
																}
																if (at) {
																	B[ak]["height"] = at
																			.css("height")
																}
																if (an.treeGrid
																		&& !ar) {
																	if (B[ak].index - 1 < g) {
																		if (an.rtl) {
																			B[ak]["border-left-width"] = "0px"
																		} else {
																			B[ak]["border-right-width"] = "0px"
																		}
																	} else {
																		if (B[ak].index - 1 == g) {
																			if (!an.rtl) {
																				B[ak]["border-left-width"] = "0px"
																			} else {
																				B[ak]["border-right-width"] = "0px"
																			}
																		}
																	}
																}
															}
														}
														if (aq.exportable
																&& (!aq.hidden || f)) {
															if (ao == true) {
																if (!X[aq.displayfield].customCellStyles) {
																	X[aq.displayfield].customCellStyles = new Array()
																}
																X[aq.displayfield].customCellStyles[ap] = ak
															} else {
																if (ar) {
																	X[aq.displayfield].style = ak
																} else {
																	if (!al) {
																		X[aq.displayfield].cellStyle = ak
																	} else {
																		X[aq.displayfield].cellAltStyle = ak
																	}
																}
															}
														}
													};
													i(J, aj, true, false, this,
															r, ae);
													y++;
													i(D, ai, false, false,
															this, r, ae);
													if (r.altrows) {
														D = "cellalt" + A;
														i(D, j, false, true,
																this, r, ae)
													}
													if (this.customCellStyles) {
														for ( var ac in ad.customCellStyles) {
															ai
																	.removeClass(ad.customCellStyles[ac])
														}
														for ( var ac in ad.customCellStyles) {
															ai
																	.addClass(ad.customCellStyles[ac]);
															i(
																	D
																			+ ad.customCellStyles[ac],
																	ai, false,
																	false,
																	this, r,
																	ae, true,
																	ac);
															ai
																	.removeClass(ad.customCellStyles[ac])
														}
													}
													A++
												}
											});
							if (s != "json" && s != "xml") {
								if (g > 0 && this.treeGrid) {
									var Z = g + 1;
									if (this.rtl) {
										Z = o.length - g
									}
									if (B["column" + Z]) {
										var e = B["column" + Z];
										e.merge = g;
										e["border-left-width"] = "1px";
										var G = B["cell" + Z];
										for (var V = 0; V < o.length; V++) {
											var Z = V + 1;
											if (this.rtl) {
												Z = o.length - V
											}
											B["column" + Z].level = V;
											B["column" + Z].maxLevel = g;
											B["cell" + Z].maxLevel = g;
											if (B["cellalt" + Z]) {
												B["cellalt" + Z].maxLevel = g
											}
										}
										for (var V = 0; V < g; V++) {
											var Z = V + 1;
											var C = V;
											if (this.rtl) {
												Z = o.length - V
											}
											var q = B["column" + Z];
											q.disabled = true;
											B["cell" + Z].level = C;
											B["cell" + Z].maxLevel = g;
											B["column" + Z].level = C;
											if (B["cellalt" + Z]) {
												B["cellalt" + Z].level = C;
												B["cellalt" + Z].maxLevel = g
											}
											if (s == "html" || s == "pdf"
													|| s == "xls") {
												q["font-size"] = e["font-size"];
												q["font-weight"] = e["font-weight"];
												q["font-style"] = e["font-style"];
												q["background-color"] = e["background-color"];
												q.color = e.color;
												q["border-color"] = e["border-color"];
												if (s == "html" || s == "pdf") {
													q["border-top-width"] = e["border-top-width"];
													q["border-left-width"] = e["border-left-width"];
													if (this.rtl) {
														q["border-right-width"] = e["border-right-width"];
														if (V == 0) {
															q["border-right-width"] = "1px"
														}
													}
													if (V == 0 && !this.rtl) {
														q["border-left-width"] = "0px"
													} else {
														if (V == 0 && this.rtl) {
															q["border-left-width"] = "0px"
														}
													}
													if (!this.rtl) {
														q["border-right-width"] = "0px"
													} else {
														if (this.rtl) {
															q["border-left-width"] = "0px"
														}
													}
													q["border-bottom-width"] = "0px";
													var q = B["cell" + Z];
													if (!this.rtl) {
														q["border-right-width"] = "0px"
													} else {
														if (this.rtl) {
															q["border-left-width"] = "0px"
														}
													}
												}
											}
										}
									}
								}
							}
							if (this.showaggregates) {
								var F = [];
								var M = s == "xls" ? "AG" : "";
								var N = 0;
								if (this.rowdetails && !this.treeGrid) {
									N++
								}
								if (z.length > 0) {
									b
											.each(
													o,
													function(j) {
														if (this.aggregates) {
															for (var ad = 0; ad < this.aggregates.length; ad++) {
																if (!F[ad]) {
																	F[ad] = {}
																}
																if (F[ad]) {
																	var ae = r
																			._getaggregatename(this.aggregates[ad]);
																	var af = r
																			._getaggregatetype(this.aggregates[ad]);
																	var ac = z[j
																			- N];
																	if (ac) {
																		F[ad][this.displayfield] = M
																				+ ae
																				+ ": "
																				+ ac[af]
																	}
																}
															}
														}
													});
									b
											.each(
													o,
													function(j) {
														for (var ac = 0; ac < F.length; ac++) {
															if (F[ac][this.displayfield] == undefined) {
																F[ac][this.displayfield] = M
															}
														}
													})
								}
								b.each(F, function() {
									W.push(this)
								})
							}
							var I = this;
							var R = b.jqx.dataAdapter.ArrayExporter(W, X, B, O,
									this.treeGrid
											&& (s == "xml" || s == "json"));
							if (E == undefined) {
								this._renderrows();
								var u = R.exportTo(s);
								if (this.showaggregates) {
									b.each(F, function() {
										W.pop(this)
									})
								}
								setTimeout(function() {
									I.exporting = false
								}, 50);
								return u
							} else {
								var p = this.treeGrid
										&& (s == "xml" || s == "json");
								R.exportToFile(s, E, O, H, p)
							}
							if (this.showaggregates) {
								b.each(F, function() {
									W.pop(this)
								})
							}
							this._renderrows();
							setTimeout(function() {
								I.exporting = false
							}, 50)
						},
						_getexportcolor : function(l) {
							var f = l;
							if (l == "transparent") {
								f = "#FFFFFF"
							}
							if (!f || !f.toString()) {
								f = "#FFFFFF"
							}
							if (f.toString().indexOf("rgb") != -1) {
								var i = f.split(",");
								if (f.toString().indexOf("rgba") != -1) {
									var d = parseInt(i[0].substring(5));
									var h = parseInt(i[1]);
									var j = parseInt(i[2]);
									var k = parseInt(i[3].substring(1, 4));
									var m = {
										r : d,
										g : h,
										b : j
									};
									var e = this._rgbToHex(m);
									if (d == 0 && h == 0 && j == 0 && k == 0) {
										return "#ffffff"
									}
									return "#" + e
								}
								var d = parseInt(i[0].substring(4));
								var h = parseInt(i[1]);
								var j = parseInt(i[2].substring(1, 4));
								var m = {
									r : d,
									g : h,
									b : j
								};
								var e = this._rgbToHex(m);
								return "#" + e
							} else {
								if (f.toString().indexOf("#") != -1) {
									if (f.toString().length == 4) {
										var c = f.toString().substring(1, 4);
										f += c
									}
								}
							}
							return f
						},
						_rgbToHex : function(c) {
							return this._intToHex(c.r) + this._intToHex(c.g)
									+ this._intToHex(c.b)
						},
						_intToHex : function(d) {
							var c = (parseInt(d).toString(16));
							if (c.length == 1) {
								c = ("0" + c)
							}
							return c.toUpperCase()
						},
						_getexportcolumntype : function(g) {
							var h = this;
							var f = "string";
							var e = h.source.datafields
									|| ((h.source._source) ? h.source._source.datafields
											: null);
							if (e) {
								var j = "";
								b.each(e, function() {
									if (this.name == g.displayfield) {
										if (this.type) {
											j = this.type
										}
										return false
									}
								});
								if (j) {
									return j
								}
							}
							if (g != null) {
								if (this.dataview.cachedrecords == undefined) {
									return f
								}
								var c = null;
								if (!this.virtualmode) {
									if (this.dataview.cachedrecords.length == 0) {
										return f
									}
									c = this.dataview.cachedrecords[0][g.displayfield];
									if (c != null && c.toString() == "") {
										return "string"
									}
								} else {
									b.each(this.dataview.cachedrecords,
											function() {
												c = this[g.displayfield];
												return false
											})
								}
								if (c != null) {
									if (g.cellsformat.indexOf("c") != -1) {
										return "number"
									}
									if (g.cellsformat.indexOf("n") != -1) {
										return "number"
									}
									if (g.cellsformat.indexOf("p") != -1) {
										return "number"
									}
									if (g.cellsformat.indexOf("d") != -1) {
										return "date"
									}
									if (g.cellsformat.indexOf("y") != -1) {
										return "date"
									}
									if (g.cellsformat.indexOf("M") != -1) {
										return "date"
									}
									if (g.cellsformat.indexOf("m") != -1) {
										return "date"
									}
									if (g.cellsformat.indexOf("t") != -1) {
										return "date"
									}
									if (typeof c == "boolean") {
										f = "boolean"
									} else {
										if (b.jqx.dataFormat.isNumber(c)) {
											f = "number"
										} else {
											var i = new Date(c);
											if (i.toString() == "NaN"
													|| i.toString() == "Invalid Date") {
												if (b.jqx.dataFormat) {
													i = b.jqx.dataFormat
															.tryparsedate(c);
													if (i != null) {
														if (i
																&& i
																		.getFullYear()) {
															if (i.getFullYear() == 1970
																	&& i
																			.getMonth() == 0
																	&& i
																			.getDate() == 1) {
																var d = new Number(
																		c);
																if (!isNaN(d)) {
																	return "number"
																}
																return "string"
															}
														}
														return "date"
													} else {
														f = "string"
													}
												} else {
													f = "string"
												}
											} else {
												f = "date"
											}
										}
									}
								}
							}
							return f
						},
						showdetails : function(c) {
							var d = this._getkey(c);
							this.showdetailsbykey(d)
						},
						hidedetails : function(c) {
							var d = this._getkey(c);
							this.hidedetailsbykey(d)
						},
						setcellvaluebykey : function(C, r, v) {
							var j = this.rowsByKey[C];
							var k = this.getrowindex(j);
							var h = j;
							if (h != null && h[r] == v) {
								return false
							}
							if (h != null && h[r] === null && v === "") {
								return
							}
							var n = "";
							if (h != null && h[r] !== v) {
								var e = this.getcolumn(r);
								var f = "string";
								var z = this.source.datafields
										|| ((this.source._source) ? this.source._source.datafields
												: null);
								if (z) {
									var s = "";
									b.each(z, function() {
										if (this.name == e.displayfield) {
											if (this.type) {
												s = this.type
											}
											return false
										}
									});
									if (s) {
										f = s
									}
								}
								n = h[r];
								if (!e.nullable
										|| (v != null && v !== "" && e.nullable && v.label === undefined)) {
									if (b.jqx.dataFormat.isNumber(n)
											|| f == "number" || f == "float"
											|| f == "int" || f == "decimal"
											&& f != "date") {
										v = new Number(v);
										v = parseFloat(v);
										if (isNaN(v)) {
											v = 0
										}
									} else {
										if (b.jqx.dataFormat.isDate(n)
												|| f == "date") {
											if (v != "") {
												var y = v;
												y = new Date(y);
												if (y != "Invalid Date"
														&& y != null) {
													v = y
												} else {
													if (y == "Invalid Date") {
														y = new Date();
														v = y
													}
												}
											}
										}
									}
									if (h[r] === v) {
										return
									}
								}
								h[r] = v;
								if (this.treeGrid) {
									var q = this.treeGrid.getrow(C);
									if (q) {
										q[r] = v
									}
								}
								if (v != null && v.label != null) {
									var e = this.getcolumn(r);
									h[e.displayfield] = v.label;
									h[r] = v.value;
									if (this.treeGrid) {
										var q = this.treeGrid.getrow(C);
										if (q) {
											q[e.displayfield] = v.label;
											q[r] = v.value
										}
									}
								}
							}
							if (this.source && this.source._knockoutdatasource
									&& !this._updateFromAdapter
									&& this.autokoupdates) {
								if (this.source._source._localdata) {
									var x = k;
									var u = this.source._source._localdata()[x];
									this.source.suspendKO = true;
									var l = u;
									if (l[r] && l[r].subscribe) {
										if (v != null && v.label != null) {
											l[e.displayfield](v.label);
											l[r](v.value)
										} else {
											l[r](v)
										}
									} else {
										var z = this.source._source.datafields;
										var d = null;
										var A = null;
										if (z) {
											b.each(z, function() {
												if (this.name == r) {
													A = this.map;
													return false
												}
											})
										}
										if (A == null) {
											if (v != null && v.label != null) {
												l[r] = v.value;
												l[e.displayfield] = v.label
											} else {
												l[r] = v
											}
										} else {
											var g = A
													.split(this.source.mapChar);
											if (g.length > 0) {
												var c = l;
												for (var t = 0; t < g.length - 1; t++) {
													c = c[g[t]]
												}
												c[g[g.length - 1]] = v
											}
										}
										this.source._source._localdata.replace(
												u, b.extend({}, l))
									}
									this.source.suspendKO = false
								}
							}
							if (this.source.updaterow
									&& (sync == undefined || sync == true)) {
								var m = false;
								var o = function(p) {
									if (false == p) {
										this.setcellvalue(j, r, n, true, false)
									}
								};
								try {
									var i = C;
									m = this.source.updaterow(i, h, o);
									if (m == undefined) {
										m = true
									}
								} catch (w) {
									m = false;
									this.setcellvalue(j, r, n);
									return
								}
							}
							var B = this.getrowdisplayindex(j);
							this._raiseEvent("cellValueChanged", {
								value : v,
								oldValue : n,
								key : C,
								boundIndex : k,
								index : B,
								row : this.rowsByKey[C]
							});
							this._renderrows()
						},
						setcellvalue : function(g, d, f) {
							if (g == null || d == null) {
								return false
							}
							var c = parseInt(g);
							var e = this._getkey(c);
							this.setcellvaluebykey(e, d, f)
						},
						getcelltext : function(f, d) {
							if (f == null || d == null) {
								return false
							}
							var c = parseInt(f);
							var e = this._getkey(c);
							return this.getcelltextbykey(e, d)
						},
						getcelltextbykey : function(e, d) {
							if (e == null || d == null) {
								return null
							}
							var c = this.getcellvaluebykey(e, d);
							var f = this.getcolumn(d);
							if (f && f.cellsformat != "") {
								if (b.jqx.dataFormat) {
									if (b.jqx.dataFormat.isDate(c)) {
										c = b.jqx.dataFormat.formatdate(c,
												f.cellsformat,
												this.gridlocalization)
									} else {
										if (b.jqx.dataFormat.isNumber(c)
												|| (!isNaN(parseFloat(c)) && isFinite(c))) {
											c = b.jqx.dataFormat.formatnumber(
													c, f.cellsformat,
													this.gridlocalization)
										}
									}
								}
							}
							return c
						},
						getcellvalue : function(f, d) {
							if (f == null || d == null) {
								return false
							}
							var c = parseInt(f);
							var e = this._getkey(c);
							return this.getcellvaluebykey(e, d)
						},
						getcellvaluebykey : function(e, d) {
							var h = this.rowsByKey[e];
							if (!h && this.treeGrid) {
								h = this.treeGrid.getrow(e)
							}
							var c = this.getrowindex(h);
							var f = h;
							var g = "";
							if (f != null) {
								return f[d]
							}
							return null
						},
						beginrowedit : function(c) {
							var d = this._getkey(c);
							this.beginroweditbykey(d)
						},
						begincelledit : function(d, c) {
							var e = this._getkey(d);
							var f = this.getcolumn(c);
							this.beginroweditbykey(e, f)
						},
						endcelledit : function(d, c, e) {
							this.endrowedit(d, e)
						},
						endrowedit : function(c, e) {
							var d = this._getkey(c);
							this.endroweditbykey(d, e)
						},
						getrowindex : function(f) {
							var d = this.getRows().indexOf(f);
							if (d != -1) {
								return d
							}
							if (this.groups && this.groups.length > 0) {
								var c = this.getRows();
								for (var e = 0; e < c.length; e++) {
									if (c[e].uid == f.originalRecord.uid) {
										d = e;
										break
									}
								}
							}
							return d
						},
						getrowdisplayindex : function(f) {
							var d = this.getView().indexOf(f);
							if (d != -1) {
								return d
							}
							if (f == undefined) {
								return d
							}
							var c = this.getView();
							for (var e = 0; e < c.length; e++) {
								if (c[e].uid == f.uid
										|| (f.originalRecord && c[e].uid == f.originalRecord.uid)) {
									d = e;
									break
								}
							}
							return d
						},
						beginroweditbykey : function(E, q) {
							if (this._lastSelectedKey == null) {
								this.selectrowbykey(E)
							}
							if (this.editKey === E && this.editKey != undefined) {
								return false
							}
							if (this.rowinfo[E] && this.rowinfo[E].locked) {
								return false
							}
							if (this.editKey != null) {
								this.endroweditbykey(E, true);
								return false
							}
							var C = this.editSettings.editSingleCell;
							if (!q && C && this.columns.records
									&& this.columns.records.length > 0) {
								for (var y = 0; y < this.columns.records.length; y++) {
									q = this.columns.records[y];
									if (q.editable && !q.hidden) {
										break
									}
								}
								if (!q) {
									return false
								}
							}
							if (C && q && !q.editable) {
								this.editKey = null;
								return false
							}
							if (C) {
								this.editColumn = q
							}
							var o = this;
							var m = this.rowsByKey[E];
							if (this.treeGrid) {
								var m = this.treeGrid.getrow(E)
							}
							var n = this.getrowindex(m);
							var B = this._getuirow(E);
							var s = this._getpinneduirow(E);
							this._editors = new Array();
							var p = false;
							if (B) {
								var h = B[0].cells;
								var t = 0;
								for (var y = 0; y < h.length; y++) {
									var g = this.columns.records[y];
									var d = h[y];
									if (g.rowdetailscolumn) {
										continue
									}
									if (g.checkboxcolumn) {
										continue
									}
									if (g.pinned) {
										d = s[0].cells[y]
									}
									if (C && q && g.datafield != q.datafield) {
										continue
									}
									b(d)
											.removeClass(
													this
															.toTP("jqx-grid-cell-selected"));
									b(d)
											.removeClass(
													this
															.toTP("jqx-fill-state-pressed"));
									b(d).removeClass(
											this.toTP("jqx-grid-cell-hover"));
									b(d).removeClass(
											this.toTP("jqx-fill-state-hover"));
									if (g.columntype == "none") {
										continue
									}
									var u = b(d).outerWidth();
									var w = b(d).width();
									if (t === 0) {
										t = b(d).outerHeight() - 1
									}
									b(d).css("padding", "0px");
									cellContent = "<div style='height:"
											+ t
											+ "px; width: 100%; overflow: hidden; border-radius: 0px; -moz-border-radius: 0px; -webkit-border-radius: 0px; z-index: 9999;'></div>";
									var r = this.getcelltextbykey(E,
											g.displayfield);
									d.innerHTML = cellContent;
									var e = b(d.firstChild);
									switch (g.columntype) {
									case "textbox":
									case "default":
										var j = b(
												"<input style='border: none;' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' type='textbox'/>")
												.appendTo(e);
										if (this.rtl) {
											j.css("direction", "rtl")
										}
										j.addClass(this
												.toThemeProperty("jqx-input"));
										j
												.addClass(this
														.toThemeProperty("jqx-widget-content"));
										j
												.addClass(this
														.toThemeProperty("jqx-cell-editor"));
										j[0].onfocus = function(i) {
											setTimeout(
													function() {
														if (i) {
															var F = b(i.target)
																	.parent()
																	.parent()
																	.index();
															if (F >= 0) {
																o
																		.ensurecolumnvisible(o.columns.records[F].datafield)
															}
														} else {
															var F = b(
																	document.activeElement)
																	.parent()
																	.parent()
																	.index();
															if (F >= 0) {
																o
																		.ensurecolumnvisible(o.columns.records[F].datafield)
															}
														}
														if (o.content) {
															o.content[0].scrollTop = 0;
															o.content[0].scrollLeft = 0
														}
														if (o.gridcontent) {
															o.gridcontent[0].scrollLeft = 0;
															o.gridcontent[0].scrollTop = 0
														}
													}, 10)
										};
										if (!g.editable) {
											j.attr("disabled", true);
											j.attr("readOnly", true);
											j
													.addClass(this
															.toThemeProperty("jqx-fill-state-disabled"))
										} else {
											if (!p) {
												p = true;
												var f = b.jqx.browser.msie
														&& b.jqx.browser.version > 10;
												if (!f) {
													j.focus()
												}
												var c = j;
												setTimeout(
														function() {
															if (!f) {
																c.focus()
															}
															try {
																if ("selectionStart" in c[0]) {
																	c[0]
																			.setSelectionRange(
																					0,
																					0)
																} else {
																	var i = c[0]
																			.createTextRange();
																	i
																			.collapse(true);
																	i
																			.moveEnd(
																					"character",
																					0);
																	i
																			.moveStart(
																					"character",
																					0);
																	i.select()
																}
															} catch (F) {
																var G = F
															}
														}, 10)
											}
										}
										j.width(w);
										j.height(t);
										if (b.jqx.browser.msie
												&& b.jqx.browser.version < 9) {
											j.css("line-height", parseInt(t)
													+ "px")
										}
										j.css("text-align", g.cellsalign);
										if (r === null) {
											r = ""
										}
										if (r == undefined) {
											r = ""
										}
										j.val(r);
										if (g.createeditor) {
											var A = r;
											var r = this.getcellvaluebykey(E,
													g.displayfield);
											g.createeditor(!this.treeGrid ? n
													: E, r, j, A, w, t)
										}
										this._editors.push({
											column : g,
											editor : j
										});
										if (g.cellsformat != "") {
											if (g.cellsformat.indexOf("p") != -1
													|| g.cellsformat
															.indexOf("c") != -1
													|| g.cellsformat
															.indexOf("n") != -1
													|| g.cellsformat
															.indexOf("f") != -1) {
												j
														.keydown(function(F) {
															var L = F.charCode ? F.charCode
																	: F.keyCode ? F.keyCode
																			: 0;
															var I = String
																	.fromCharCode(L);
															var J = parseInt(I);
															if (isNaN(J)) {
																return true
															}
															if (o._selection(j).length > 0) {
																return true
															}
															var H = "";
															var G = j.val();
															if (g.cellsformat.length > 1) {
																var K = parseInt(g.cellsformat
																		.substring(1));
																if (isNaN(K)) {
																	K = 0
																}
															} else {
																var K = 0
															}
															if (K > 0) {
																if (G
																		.indexOf(o.gridlocalization.decimalseparator) != -1) {
																	if (o
																			._selection(j).start > G
																			.indexOf(o.gridlocalization.decimalseparator)) {
																		return true
																	}
																}
															}
															for (var M = 0; M < G.length
																	- K; M++) {
																var i = G
																		.substring(
																				M,
																				M + 1);
																if (i
																		.match(/^[0-9]+$/) != null) {
																	H += i
																}
															}
															if (H.length >= 11) {
																return false
															}
														})
											}
										}
										if (g.initeditor) {
											var A = r;
											var r = this.getcellvaluebykey(E,
													g.displayfield);
											g.initeditor(
													!this.treeGrid ? n : E, r,
													j, A, w, t)
										}
										break;
									case "custom":
									case "template":
										if (!this.editorsCache) {
											this.editorsCache = new Array()
										}
										var k = b(
												"<div style='width: 100%; height: 100%; border: none;'></div>")
												.appendTo(e);
										var x = b.trim(g.datafield).split(" ")
												.join("");
										if (x.indexOf(".") != -1) {
											x = x.replace(".", "")
										}
										var z = this.editorsCache["templateeditor_"
												+ x];
										if (g.columntype == "custom") {
											var z = this.editorsCache["customeditor_"
													+ x + "_" + E]
										}
										var A = r;
										var r = this.getcellvaluebykey(E,
												g.displayfield);
										if (!z) {
											var j = b("<div style='border: none;'></div>");
											j.width(u);
											j.height(t);
											z = j;
											if (r === null) {
												r = ""
											}
											if (g.columntype != "custom") {
												this.editorsCache["templateeditor_"
														+ x] = j
											} else {
												this.editorsCache["customeditor_"
														+ x + "_" + E] = j
											}
											j.appendTo(k);
											if (g.createeditor) {
												g.createeditor(
														!this.treeGrid ? n : E,
														r, j, A, u, t)
											}
										} else {
											var j = z;
											j.width(u);
											j.height(t);
											j.appendTo(k)
										}
										if (g.initeditor) {
											g.initeditor(
													!this.treeGrid ? n : E, r,
													j, A, u, t)
										}
										this._editors.push({
											column : g,
											editor : j
										});
										break
									}
								}
							}
							this.editKey = E;
							this.beginupdate();
							var D = this.getrowdisplayindex(m);
							this._raiseEvent("rowBeginEdit", {
								key : E,
								index : D,
								boundIndex : n,
								row : this.rowsByKey[E]
							});
							if (C) {
								var m = this.rowsByKey[E];
								var v = null;
								var l = null;
								if (m) {
									v = m[q.datafield];
									l = m[q.displayfield]
								}
								this._raiseEvent("cellBeginEdit", {
									value : v,
									displayValue : l,
									key : E,
									index : D,
									dataField : q.datafield,
									displayField : q.displayfield,
									boundIndex : n,
									row : this.rowsByKey[E]
								})
							}
							this.endupdate(false)
						},
						_toNumber : function(f) {
							if (!f.indexOf && f != undefined) {
								f = f.toString()
							}
							if (f.indexOf(this.gridlocalization.currencysymbol) > -1) {
								f = f.replace(
										this.gridlocalization.currencysymbol,
										"")
							}
							var c = function(l, j, k) {
								var h = l;
								if (j == k) {
									return l
								}
								var i = h.indexOf(j);
								while (i != -1) {
									h = h.replace(j, k);
									i = h.indexOf(j)
								}
								return h
							};
							f = c(f, this.gridlocalization.thousandsseparator,
									"");
							f = f
									.replace(
											this.gridlocalization.decimalseparator,
											".");
							if (f.indexOf(this.gridlocalization.percentsymbol) > -1) {
								f = f
										.replace(
												this.gridlocalization.percentsymbol,
												"")
							}
							var g = "";
							for (var d = 0; d < f.length; d++) {
								var e = f.substring(d, d + 1);
								if (e === "-") {
									g += "-"
								}
								if (e === ".") {
									g += "."
								}
								if (e.match(/^[0-9]+$/) != null) {
									g += e
								}
							}
							f = g;
							f = f.replace(/ /g, "");
							return f
						},
						_geteditorvalue : function(h, j, k, d) {
							var m = new String();
							if (j) {
								if (!h.geteditorvalue) {
									switch (h.columntype) {
									case "textbox":
									default:
										m = j.val();
										if (h.cellsformat != "") {
											var l = "string";
											var g = this.source.datafields
													|| ((this.source._source) ? this.source._source.datafields
															: null);
											if (g) {
												var n = "";
												b
														.each(
																g,
																function() {
																	if (this.name == h.displayfield) {
																		if (this.type) {
																			n = this.type
																		}
																		return false
																	}
																});
												if (n) {
													l = n
												}
											}
											var i = l === "number"
													|| l === "float"
													|| l === "int"
													|| l === "integer";
											var f = l === "date"
													|| l === "time";
											if (i
													|| (l === "string" && (h.cellsformat
															.indexOf("p") != -1
															|| h.cellsformat
																	.indexOf("c") != -1
															|| h.cellsformat
																	.indexOf("n") != -1 || h.cellsformat
															.indexOf("f") != -1))) {
												if (m === "" && h.nullable) {
													return ""
												}
												m = this._toNumber(m);
												m = new Number(m);
												if (isNaN(m)) {
													m = ""
												}
											}
											if (f
													|| (l === "string" && (h.cellsformat
															.indexOf("H") != -1
															|| h.cellsformat
																	.indexOf("m") != -1
															|| h.cellsformat
																	.indexOf("M") != -1
															|| h.cellsformat
																	.indexOf("y") != -1
															|| h.cellsformat
																	.indexOf("h") != -1 || h.cellsformat
															.indexOf("d") != -1))) {
												if (m === "" && h.nullable) {
													return ""
												}
												var e = m;
												m = new Date(m);
												if (m == "Invalid Date"
														|| m == null
														|| h.cellsformat.length > 1) {
													if (b.jqx.dataFormat) {
														m = b.jqx.dataFormat
																.parsedate(
																		e,
																		h.cellsformat,
																		this.gridlocalization)
													}
													if (m == "Invalid Date"
															|| m == null) {
														m = ""
													}
												}
											}
										}
										if (h.displayfield != h.datafield) {
											m = {
												label : m,
												value : m
											}
										}
										break
									}
								}
								if (h.geteditorvalue) {
									var c = this.getcellvaluebykey(d,
											h.displayfield);
									m = h.geteditorvalue(
											!this.treeGrid ? k : d, c, j)
								}
							}
							return m
						},
						endroweditbykey : function(A, e) {
							var h = this.rowsByKey[A];
							var j = this.getrowindex(h);
							var k = this;
							if (e !== true) {
								var p = this._editors;
								var d = true;
								if (p) {
									var q = this.editKey;
									var w = this._getuirow(q);
									for (var v = 0; v < p.length; v++) {
										var f = p[v].editor;
										var c = p[v].column;
										var t = this
												._geteditorvalue(c, f, j, q);
										if (c.validation) {
											f
													.removeClass(this
															.toThemeProperty("jqx-grid-validation-label"));
											var o = c.datafield;
											try {
												var s = c
														.validation(
																{
																	value : t,
																	row : q,
																	datafield : c.datafield,
																	displayfield : c.displayfield,
																	column : c
																}, t);
												var l = this.gridlocalization.validationstring;
												if (s.message != undefined) {
													l = s.message
												}
												var m = typeof s == "boolean" ? s
														: s.result;
												if (!m) {
													if (s.showmessage == undefined
															|| s.showmessage == true) {
														this
																._showvalidationpopup(
																		w, o,
																		l, f)
													}
													d = false
												}
											} catch (u) {
												this
														._showvalidationpopup(
																w,
																o,
																this.gridlocalization.validationstring,
																f);
												d = false
											}
										}
									}
									if (d) {
										this.dataview._sortHierarchyData = null;
										this.dataview._sortData = null;
										for (var v = 0; v < p.length; v++) {
											var f = p[v].editor;
											var c = p[v].column;
											var t = this._geteditorvalue(c, f,
													j, q);
											var r = h[c.displayfield];
											if (t && t.label != undefined) {
												h[c.displayfield] = t.label;
												h[c.datafield] = t.value
											} else {
												h[c.displayfield] = t
											}
											if (this.treeGrid) {
												var n = this.treeGrid.getrow(q);
												if (n) {
													n[c.displayfield] = t
												}
											}
											if (t != r) {
												if (this.editorsCache) {
													var y = "customeditor_"
															+ c.displayfield
															+ "_" + A;
													var x = "templateeditor_"
															+ c.displayfield;
													if (this.editorsCache[y]) {
														this.editorsCache[y]
																.detach()
													}
													if (this.editorsCache[x]) {
														this.editorsCache[x]
																.detach()
													}
												}
												this.beginupdate();
												this._raiseEvent(
														"cellValueChanged", {
															value : t,
															oldValue : r,
															key : A,
															index : j,
															row : h
														});
												this.endupdate(false)
											}
										}
									}
								}
								if (!d) {
									return false
								}
								this.updaterowbykey(this.editKey, h, false)
							}
							if (this.editorsCache) {
								for ( var f in this.editorsCache) {
									b(this.editorsCache[f]).detach()
								}
							}
							this.beginupdate();
							var z = this.getrowdisplayindex(h);
							this._raiseEvent("rowEndEdit", {
								key : A,
								index : z,
								boundIndex : j,
								row : this.rowsByKey[A]
							});
							if (this.editSettings.editSingleCell) {
								var h = this.rowsByKey[A];
								var t = null;
								var g = null;
								if (h) {
									t = h[this.editColumn.datafield];
									g = h[this.editColumn.displayfield]
								}
								this
										._raiseEvent(
												"cellEndEdit",
												{
													value : t,
													displayValue : g,
													key : A,
													index : z,
													dataField : this.editColumn.datafield,
													displayField : this.editColumn.displayfield,
													boundIndex : j,
													row : this.rowsByKey[A]
												})
							}
							this.endupdate(false);
							this.editColumn = null;
							this.editKey = null;
							this._renderrows();
							this._renderhorizontalscroll();
							this.host.focus();
							setTimeout(function() {
								k.host.focus()
							}, 10);
							return true
						},
						_showvalidationpopup : function(q, e, r, m) {
							if (r == undefined) {
								var r = this.gridlocalization.validationstring
							}
							m
									.addClass(this
											.toThemeProperty("jqx-grid-validation-label"));
							var p = b("<div style='z-index: 99999; top: 0px; left: 0px; position: absolute;'></div>");
							var o = b("<div style='width: 20px; height: 20px; z-index: 999999; top: 0px; left: 0px; position: absolute;'></div>");
							p.html(r);
							o
									.addClass(this
											.toThemeProperty("jqx-grid-validation-arrow-up"));
							p.addClass(this
									.toThemeProperty("jqx-grid-validation"));
							p.addClass(this.toThemeProperty("jqx-rc-all"));
							p.hide();
							o.hide();
							p.prependTo(this.table);
							o.prependTo(this.table);
							var h = this.hScrollInstance;
							var j = h.value;
							var g = parseInt(j);
							var l = this.getcolumn(e).uielement;
							var k = q;
							p
									.css("top", parseInt(k.position().top) + 30
											+ "px");
							var c = parseInt(p.css("top"));
							o.css("top", c - 11);
							o.removeClass();
							o
									.addClass(this
											.toThemeProperty("jqx-grid-validation-arrow-up"));
							var f = false;
							if (c >= this._table.height()) {
								o
										.removeClass(this
												.toThemeProperty("jqx-grid-validation-arrow-up"));
								o
										.addClass(this
												.toThemeProperty("jqx-grid-validation-arrow-down"));
								c = parseInt(k.position().top)
										- k.outerHeight() - 5;
								if (c < 0) {
									c = 0;
									o
											.removeClass(this
													.toThemeProperty("jqx-grid-validation-arrow-down"));
									f = true
								}
								p.css("top", c + "px");
								o.css("top", c + p.outerHeight() - 9)
							}
							var n = -g + parseInt(b(l).position().left);
							o.css("left", g + n + 30);
							var d = p.width();
							if (d + n > this.host.width() - 20) {
								var i = d + n - this.host.width() + 40;
								n -= i
							}
							if (!f) {
								p.css("left", g + n)
							} else {
								p.css("left", g
										+ parseInt(b(l).position().left)
										- p.outerWidth())
							}
							m.mouseenter(function() {
								if (m.hasClass("jqx-grid-validation-label")) {
									p.show();
									o.show()
								}
							});
							m.mouseleave(function() {
								p.hide();
								o.hide()
							});
							if (!this.popups) {
								this.popups = new Array()
							}
							this.popups[this.popups.length] = {
								validation : p,
								validationrow : o
							}
						},
						addrow : function(d, p, j, n) {
							if (p != undefined) {
								this._datachanged = true;
								if (j == undefined) {
									j = "last"
								}
								var o = false;
								var k = this.that;
								if (d == null) {
									var f = this.dataview.filters
											&& this.dataview.filters.length > 0;
									var m = !f ? this.dataview.totalrecords
											: this.source.records.length;
									if (!this.pageable) {
										if (this.source._source.totalrecords) {
											this.dataview.totalrecords = this.source._source.totalrecords
										} else {
											if (this.source._source.totalRecords) {
												this.dataview.totalrecords = this.source._source.totalRecords
											} else {
												if (this.source.hierarchy.length !== 0) {
													this.dataview.totalrecords = this.source.hierarchy.length
												} else {
													this.dataview.totalrecords = this.source.records.length
												}
											}
										}
										var m = !f ? this.dataview.totalrecords
												: this.source.records.length
									}
									if (!b.isArray(p)) {
										d = this.dataview.getid(
												this.dataview.source.id, p, m);
										if (this
												.getcolumn(this.dataview.source.id)) {
											p[this.dataview.source.id] = d
										}
									} else {
										var c = new Array();
										b
												.each(
														p,
														function(e, q) {
															var r = k.dataview
																	.getid(
																			k.dataview.source.id,
																			p[e],
																			m
																					+ e);
															c.push(r);
															if (k
																	.getcolumn(k.dataview.source.id)) {
																p[e][k.dataview.source.id] = r
															}
														});
										d = c
									}
								} else {
									if (!b.isArray(p)) {
										if (this
												.getcolumn(this.dataview.source.id)) {
											p[this.dataview.source.id] = d
										}
									} else {
										b
												.each(
														p,
														function(e, q) {
															var r = d[e];
															if (k
																	.getcolumn(k.dataview.source.id)) {
																p[e][k.dataview.source.id] = r
															}
														})
									}
								}
								var i = this.treeGrid ? (this.treeGrid.virtualModeCreateRecords ? true
										: false)
										: false;
								var g = function(r, q, u, e) {
									if (r._loading) {
										throw new Error("jqxDataTable: "
												+ r.loadingerrorthatssage);
										return false
									}
									var t = r.vScrollInstance.value;
									var s = false;
									if (!b.isArray(u)) {
										u.uid = q;
										r.rowsByKey[q] = u;
										if (q == n) {
											n = null
										}
										s = r.source.addRecord(u, e, n, i)
									} else {
										b.each(u, function(v, w) {
											var x = null;
											if (q != null && q[v] != null) {
												x = q[v]
											}
											this.uid = x;
											r.rowsByKey[x] = this;
											if (q == n) {
												n = null
											}
											s = r.source.addRecord(this, e, n,
													i)
										})
									}
									if (r._updating == undefined
											|| r._updating == false) {
										r.refresh()
									}
									if (r.source
											&& r.source._knockoutdatasource
											&& !r._updateFromAdapter
											&& r.autokoupdates) {
										if (r.source._source._localdata) {
											r.source.suspendKO = true;
											r.source._source._localdata.push(u);
											r.source.suspendKO = false
										}
									}
									r.vScrollInstance.setPosition(t);
									return s
								};
								if (this.source.addrow) {
									var h = function(e, q) {
										if (e == true || e == undefined) {
											if (q != undefined) {
												d = q
											}
											g(k, d, p, j)
										}
									};
									try {
										if (!k.treeGrid) {
											o = this.source.addrow(d, p, j, h)
										} else {
											o = this.source.addrow(d, p, j, n,
													h)
										}
										if (o == undefined) {
											o = true
										}
									} catch (l) {
										o = false
									}
									if (o == false) {
										return false
									}
								} else {
									g(this, d, p, j)
								}
								return o
							}
							return false
						},
						deleterow : function(c) {
							var d = this._getkey(c);
							this.deleterowbykey(d)
						},
						deleterowbykey : function(g) {
							if (g != undefined) {
								this._datachanged = true;
								var h = false;
								var f = this.that;
								var d = function(l, k) {
									if (l._loading) {
										throw new Error("jqxDataTable: "
												+ l.loadingerrorthatssage);
										return false
									}
									var m = false;
									var n = l.vScrollInstance.value;
									if (!b.isArray(k)) {
										var m = false;
										if (l.rowsByKey[k]) {
											m = true;
											if (l.rowinfo[k].selected) {
												l.unselectrowbykey(k, false)
											}
											delete l.rowsByKey[k];
											if (l.treeGrid) {
												if (l.rowinfo[k]) {
													var i = l.rowinfo[k].row.records;
													var j = function(o) {
														for (var p = 0; p < o.length; p++) {
															var q = o[p].uid;
															delete l.rowsByKey[q];
															delete l.rowinfo[q];
															if (o[p].records) {
																j(o[p].records)
															}
														}
													};
													if (i) {
														j(i)
													}
												}
											}
											delete l.rowinfo[k];
											l.source.deleteRecord(k)
										}
									} else {
										b
												.each(
														k,
														function() {
															var q = this;
															if (l.rowsByKey[q]) {
																m = true;
																if (l.rowinfo[q].selected) {
																	l
																			.unselectrowbykey(
																					q,
																					false)
																}
																delete l.rowsByKey[q];
																if (l.treeGrid) {
																	if (l.rowinfo[q]) {
																		var o = l.rowinfo[q].row.records;
																		var p = function(
																				r) {
																			for (var s = 0; s < r.length; s++) {
																				var t = r[s].uid;
																				delete l.rowsByKey[t];
																				delete l.rowinfo[t];
																				if (r[s].records) {
																					p(r[s].records)
																				}
																			}
																		};
																		if (o) {
																			p(o);
																			delete l.rowinfo[q]
																		}
																	}
																}
																l.source
																		.deleteRecord(q)
															}
														})
									}
									l.refresh();
									if (l.source
											&& l.source._knockoutdatasource
											&& !l._updateFromAdapter
											&& l.autokoupdates) {
										if (l.source._source._localdata) {
											l.source.suspendKO = true;
											l.source._source._localdata
													.pop(rowdata);
											l.source.suspendKO = false
										}
									}
									l.vScrollInstance.setPosition(n);
									return m
								};
								if (this.source.deleterow) {
									var c = function(i) {
										if (i == true || i == undefined) {
											d(f, g)
										}
									};
									try {
										this.source.deleterow(g, c);
										if (h == undefined) {
											h = true
										}
									} catch (e) {
										h = false
									}
								} else {
									h = d(f, g)
								}
								return h
							}
							return false
						},
						updaterow : function(c, e) {
							var d = this._getkey(c);
							this.updaterowbykey(d, e)
						},
						updaterowbykey : function(h, j, f) {
							if (h != undefined && j != undefined) {
								var g = this.that;
								var i = false;
								var d = function(n, k, s) {
									if (n._loading) {
										throw new Error("jqxDataTable: "
												+ n.loadingerrorthatssage);
										return false
									}
									var q = false;
									if (!b.isArray(k)) {
										var m = n.rowsByKey[k];
										var r = function(u) {
											if (!u) {
												q = false
											} else {
												for (var t = 0; t < n.columns.records.length; t++) {
													u[n.columns.records[t].datafield] = s[n.columns.records[t].datafield];
													if (n.groups.length > 0) {
														u.originalRecord[n.columns.records[t].datafield] = s[n.columns.records[t].datafield]
													}
												}
											}
										};
										r(m);
										if (n.treeGrid) {
											m = n.treeGrid.getrow(k);
											r(m)
										}
									} else {
										b.each(k, function(v, w) {
											var u = n.rowsByKey[this];
											var t = function(y, x) {
												if (!u) {
													q = false
												} else {
													u[this] = s[v]
												}
											};
											t(this, u);
											if (n.treeGrid) {
												u = n.treeGrid.getrow(this);
												t(this, u)
											}
										})
									}
									var l = n.vScrollInstance.value;
									if (f == undefined || f == true) {
										if (n._updating == undefined
												|| n._updating == false) {
											n._renderrows()
										}
									}
									if (n.showaggregates
											&& n._updatecolumnsaggregates) {
										n._updatecolumnsaggregates()
									}
									if (n.source
											&& n.source._knockoutdatasource
											&& !n._updateFromAdapter
											&& n.autokoupdates) {
										if (n.source._source._localdata) {
											var m = n.rowsByKey[k];
											var o = n.getrowindex(m);
											var p = n.source._source
													._localdata()[o];
											n.source.suspendKO = true;
											n.source._source._localdata
													.replace(p, b.extend({}, m));
											n.source.suspendKO = false
										}
									}
									n.vScrollInstance.setPosition(l);
									return q
								};
								if (this.source.updaterow) {
									var c = function(k) {
										if (k == true || k == undefined) {
											d(g, h, j)
										}
									};
									try {
										i = this.source.updaterow(h, j, c);
										if (i == undefined) {
											i = true
										}
									} catch (e) {
										i = false
									}
								} else {
									i = d(g, h, j)
								}
								return i
							}
							return false
						},
						lockrow : function(c) {
							var d = this._getkey(c);
							this.lockrowbykey(d)
						},
						unlockrow : function(c) {
							var d = this._getkey(c);
							this.unlockrowbykey(d)
						},
						lockrowbykey : function(c) {
							if (this.rowinfo[c]) {
								this.rowinfo[c].locked = true
							} else {
								this.rowinfo[c] = {
									locked : true
								}
							}
							this._renderrows()
						},
						unlockrowbykey : function(c) {
							if (this.rowinfo[c]) {
								this.rowinfo[c].locked = false
							} else {
								this.rowinfo[c] = {
									locked : false
								}
							}
							this._renderrows()
						},
						selectrow : function(c) {
							var d = this._getkey(c);
							this.selectrowbykey(d)
						},
						unselectrow : function(c) {
							var d = this._getkey(c);
							this.unselectrowbykey(d)
						},
						selectrowbykey : function(e, h, f) {
							if (h != "keyboard" && h != "mouse") {
								this._lastSelectedKey = e
							}
							var g = f !== false ? true : false;
							this._doSelection(e, true, g);
							var i = this.rowsByKey[e];
							var d = this.getrowindex(i);
							var c = this.getrowdisplayindex(i);
							this._raiseEvent("rowSelect", {
								key : e,
								index : c,
								boundIndex : d,
								row : this.rowsByKey[e]
							})
						},
						unselectrowbykey : function(e, f) {
							var g = f !== false ? true : false;
							this._doSelection(e, false, g);
							var h = this.rowsByKey[e];
							var d = this.getrowindex(h);
							var c = this.getrowdisplayindex(h);
							this._raiseEvent("rowUnselect", {
								key : e,
								index : c,
								boundIndex : d,
								row : this.rowsByKey[e]
							})
						},
						getselection : function() {
							var c = new Array();
							if (this.rowinfo) {
								for ( var e in this.rowinfo) {
									var d = this.rowinfo[e];
									if (d.selected) {
										c.push(d.row)
									}
								}
							}
							return c
						},
						showdetailsbykey : function(k) {
							if (!this.rowdetails) {
								return
							}
							var l = this.rowinfo[k];
							if (l) {
								l.expanded = true;
								var e = b(this._table.children()[1]).children(
										("[data-key=" + k + "]"));
								var h = b(this._pinnedTable.children()[1])
										.children(("[data-key=" + k + "]"));
								if (e) {
									var c = h.children();
									var g = b(c[0]);
									if (this.rtl) {
										var g = b(c[c.length - 1])
									}
									if (!this.rtl) {
										g
												.removeClass(this
														.toThemeProperty("jqx-grid-group-collapse"));
										g
												.addClass(this
														.toThemeProperty("jqx-grid-group-expand"));
										g
												.removeClass(this
														.toThemeProperty("jqx-icon-arrow-right"));
										g
												.addClass(this
														.toThemeProperty("jqx-icon-arrow-down"))
									} else {
										g
												.removeClass(this
														.toThemeProperty("jqx-grid-group-collapse-rtl"));
										g
												.addClass(this
														.toThemeProperty("jqx-grid-group-expand-rtl"));
										g
												.removeClass(this
														.toThemeProperty("jqx-icon-arrow-left"));
										g
												.addClass(this
														.toThemeProperty("jqx-icon-arrow-down"))
									}
									e.next().show();
									var i = h.next();
									i.show();
									if (b.jqx.browser.msie
											&& b.jqx.browser.version < 8) {
										e.next().children().show();
										h.next().children().show()
									}
									if (!l.initialized) {
										var j = l.detailsHeight;
										var m = this.initrowdetails(k, l.row,
												b(b(i).children().children()
														.children()[0]), l);
										l.details = b(i).children().children()
												.children()[0];
										l.initialized = true;
										if (m === false || l.detailsHeight != j) {
											if (m === false) {
												l.expanded = false;
												l.nodetails = true;
												i.hide()
											}
											this._renderrows()
										}
									}
									this._updateScrollbars();
									if (this.height === "auto"
											|| this.height === null
											|| this.autoheight) {
										this._arrange()
									}
									var f = this.getrowindex(l.row);
									var d = this.getrowdisplayindex(l.row);
									this._raiseEvent("rowExpand", {
										row : l.row,
										index : d,
										boundIndex : f,
										rowKey : k
									})
								}
							}
						},
						hidedetailsbykey : function(h) {
							if (!this.rowdetails) {
								return
							}
							var j = this.rowinfo[h];
							if (j) {
								j.expanded = false;
								var d = b(this._table.children()[1]).children(
										("[data-key=" + h + "]"));
								var e = b(this._pinnedTable.children()[1])
										.children(("[data-key=" + h + "]"));
								if (d) {
									var g = e.children();
									var i = b(g[0]);
									if (this.rtl) {
										var i = b(g[g.length - 1])
									}
									if (!this.rtl) {
										i
												.addClass(this
														.toThemeProperty("jqx-grid-group-collapse"));
										i
												.removeClass(this
														.toThemeProperty("jqx-grid-group-expand"));
										i
												.addClass(this
														.toThemeProperty("jqx-icon-arrow-right"));
										i
												.removeClass(this
														.toThemeProperty("jqx-icon-arrow-down"))
									} else {
										i
												.addClass(this
														.toThemeProperty("jqx-grid-group-collapse-rtl"));
										i
												.removeClass(this
														.toThemeProperty("jqx-grid-group-expand-rtl"));
										i
												.addClass(this
														.toThemeProperty("jqx-icon-arrow-left"));
										i
												.removeClass(this
														.toThemeProperty("jqx-icon-arrow-down"))
									}
									d.next().hide();
									e.next().hide();
									if (b.jqx.browser.msie
											&& b.jqx.browser.version < 8) {
										d.next().children().hide();
										e.next().children().hide()
									}
									this._updateScrollbars();
									if (this.height === "auto"
											|| this.height === null
											|| this.autoheight) {
										this._arrange()
									}
									var f = this.getrowindex(j.row);
									var c = this.getrowdisplayindex(j.row);
									this._raiseEvent("rowCollapse", {
										row : j.row,
										index : c,
										boundIndex : f,
										rowKey : h
									})
								}
							}
						},
						_renderhorizontalscroll : function() {
							var f = this.hScrollInstance;
							var k = f.value;
							if (this.hScrollBar.css("visibility") === "hidden") {
								f.value = 0;
								k = 0
							}
							var c = parseInt(k);
							if (this.table == null) {
								return
							}
							var o = this.columnsrow;
							var i = 0;
							var n = this.columns.records.length - i;
							var e = this.columns.records;
							var m = this.source.records.length == 0;
							if (this.rtl) {
								if (this.hScrollBar.css("visibility") != "hidden") {
									c = f.max - c
								}
							}
							if (m && !this._haspinned) {
								this.table[0].style.left = -c + "px";
								o[0].style.marginLeft = -c + "px"
							} else {
								if (this._haspinned
										|| this._haspinned == undefined) {
									for (var h = 0; h < i + n; h++) {
										var d = e[h];
										if (d.pinned) {
											var p = null;
											if (this.showaggregates) {
												if (this.statusbar[0].cells) {
													p = this.statusbar[0].cells[h]
												}
											}
											if (this.filterrow) {
												if (this.filterrow[0].cells) {
													filtercell = this.filterrow[0].cells[h]
												}
											}
											if (!this.rtl) {
												var l = o[0].cells[h];
												l.style.marginLeft = c + "px";
												if (p) {
													p.style.marginLeft = c
															+ "px"
												}
												if (this.filterrow
														&& filtercell) {
													filtercell.style.marginLeft = c
															+ "px"
												}
											} else {
												var l = o[0].cells[h];
												l.style.marginLeft = -parseInt(k)
														+ "px";
												if (p) {
													p.style.marginLeft = -parseInt(k)
															+ "px"
												}
												if (this.filterrow
														&& filtercell) {
													filtercell.style.marginLeft = -parseInt(k)
															+ "px"
												}
											}
										}
									}
									this._table[0].style.left = -c + "px";
									o[0].style.marginLeft = -c + "px"
								} else {
									if (this._haspinned == false) {
										this.table[0].style.left = -c + "px";
										o[0].style.marginLeft = -c + "px"
									}
								}
								if (this.filterrow) {
									this.filterrow[0].style.left = -c + "px"
								}
							}
							if (this.showaggregates) {
								if (this.aggregates[0].cells) {
									var g = 0;
									if (this.rtl) {
										if (this.vScrollBar.css("visibility") != "hidden") {
											if (this.hScrollBar
													.css("visibility") != "hidden") {
												g = 2 + parseInt(this.hScrollBar
														.css("left"))
											} else {
												g = 3 + parseInt(this.vScrollBar
														.width())
											}
										}
									}
									this.aggregates[0].style.marginLeft = -c
											+ g + "px"
								}
							}
						},
						_initializeColumns : function() {
							var d = this.source.datafields;
							if (d == null && this.source._source) {
								d = this.source._source.datafields
							}
							var k = d ? d.length > 0 : false;
							if (this.columns && this.columns.records) {
								for (var e = 0; e < this.columns.records.length; e++) {
									this
											._removecolumnhandlers(this.columns.records[e])
								}
							}
							var j = this;
							var c = new b.jqx.collection(this.element);
							var h = 0;
							this._haspinned = false;
							if (!this._columns) {
								this._columns = this.columns
							} else {
								this.columns = this._columns
							}
							if (this.selectionmode == "checkbox") {
								var f = new a(j, this);
								f.visibleindex = h++;
								f.width = j.indentwidth;
								f.checkboxcolumn = true;
								f.editable = false;
								f.columntype = "checkbox";
								f.groupable = false;
								f.draggable = false;
								f.filterable = false;
								f.resizable = false;
								f.datafield = "_checkboxcolumn";
								c.add(f)
							}
							if (this.rowdetails && !this.treeGrid) {
								var f = new a(j, this);
								f.visibleindex = h++;
								f.width = j.indentwidth;
								f.editable = false;
								f.rowdetailscolumn = true;
								f.groupable = false;
								f.draggable = false;
								f.pinned = true;
								f.filterable = false;
								f.resizable = false;
								c.add(f)
							}
							var g = new Array();
							b
									.each(
											this.columns,
											function(i) {
												if (j.columns[i] != undefined) {
													var l = new a(j, this);
													l.visibleindex = h++;
													if (this.dataField != undefined) {
														this.datafield = this.dataField
													}
													if (this.pinned) {
														j._haspinned = true
													}
													if (this.datafield == null) {
														if (j.source
																&& j.source._source
																&& (j.source._source.datatype == "array")) {
															if (!k) {
																if (!j.source._source.datafields) {
																	j.source._source.datafields = new Array();
																	j.source._source.datafields
																			.push({
																				name : i
																						.toString()
																			})
																} else {
																	j.source._source.datafields
																			.push({
																				name : i
																						.toString()
																			})
																}
															}
															this.datafield = i
																	.toString();
															this.displayfield = i
																	.toString();
															l.datafield = this.datafield;
															l.displayfield = this.displayfield
														}
													} else {
														if (g[this.datafield]) {
															throw new Error(
																	"jqxDataTable: Invalid column 'dataField' setting. jqxDataTable's columns should be initialized with unique data fields.");
															j.host.remove();
															return false
														} else {
															g[this.datafield] = true
														}
													}
													c.add(l)
												}
											});
							if (this.rtl) {
								c.records.reverse()
							}
							this.columns = c
						},
						addfilter : function(c, e) {
							var d = this.getcolumn(c);
							if (!d) {
								return
							}
							this.dataview.addfilter(c, e)
						},
						removefilter : function(c) {
							var d = this.getcolumn(c);
							if (!d) {
								return
							}
							this.dataview.removefilter(c)
						},
						clearfilters : function(d, c) {
							this.dataview.filters = new Array();
							this.dataview._filteredData = null;
							this.dataview._sortData = null;
							this.dataview._sortHierarchyData = null;
							if (c !== false) {
								this.resetfilter()
							}
							if (d === false) {
								return
							}
							this.applyfilters()
						},
						resetfilter : function() {
							if (this.filterinput) {
								this.filterinput.val("")
							}
							if (this.filterrow) {
								for (var e = 0; e < this.filterrow[0].cells.length; e++) {
									var c = this.filterrow[0].cells[e];
									var d = b(c).find("input:first");
									var h = b(c).find(".filterconditions");
									var g = this.columns.records[e];
									var k = "";
									if (!g.filterable) {
										continue
									}
									d.val("");
									var j = this.getcolumntypebydatafield(g);
									var f = new b.jqx.filter();
									switch (j) {
									case "number":
									case "int":
									case "float":
									case "decimal":
										filtertype = "numericfilter";
										conditions = f
												.getoperatorsbyfiltertype("numericfilter");
										break;
									case "boolean":
									case "bool":
										filtertype = "booleanfilter";
										conditions = f
												.getoperatorsbyfiltertype("booleanfilter");
										break;
									case "date":
									case "time":
										filtertype = "datefilter";
										conditions = f
												.getoperatorsbyfiltertype("datefilter");
										break;
									case "string":
										filtertype = "stringfilter";
										conditions = f
												.getoperatorsbyfiltertype("stringfilter");
										break
									}
									if (h.length > 0) {
										if (filtertype === "stringfilter") {
											h.jqxDropDownList({
												selectedIndex : 2
											})
										} else {
											h.jqxDropDownList({
												selectedIndex : 0
											})
										}
									}
								}
							}
						},
						applyfilters : function() {
							if (this.editable) {
								if (this.editKey != null) {
									var c = this.endroweditbykey(this.editKey)
								}
							}
							this.dataview._filteredData = null;
							this.dataview._sortData = null;
							this.dataview._sortHierarchyData = null;
							if (this.serverProcessing) {
								this.dataview.pagenum = 0;
								this.updatebounddata("filter")
							} else {
								this.gotopage(0);
								this.refresh()
							}
							if (arguments && arguments.length > 0) {
								if (this._updateSimpleFilter) {
									if (this.filtercolumnsList) {
										var d = this.filtercolumnsList
												.jqxDropDownList("getSelectedItem").value;
										this._updateSimpleFilter(d)
									}
								}
								if (this._updateFilterRow) {
									this._updateFilterRow()
								}
							}
							this._raiseEvent("filter", {
								filters : this.dataview.filters
							})
						},
						sortby : function(d, f) {
							this.dataview._filteredData = null;
							this.dataview._sortData = null;
							this.dataview._sortHierarchyData = null;
							if (this._loading) {
								throw new Error("jqxDataTable: "
										+ this.loadingerrormessage);
								return false
							}
							if (this.editable) {
								if (this.editKey != null) {
									var c = this.endroweditbykey(this.editKey)
								}
							}
							if (d == null) {
								f = null;
								d = this.sortcolumn
							}
							if (d) {
								var e = this;
								if (f == "a" || f == "asc" || f == "ascending"
										|| f == true) {
									ascending = true
								} else {
									ascending = false
								}
								if (f != null) {
									e.sortdirection = {
										ascending : ascending,
										descending : !ascending
									}
								} else {
									e.sortdirection = {
										ascending : false,
										descending : false
									}
								}
								if (f != null) {
									e.sortcolumn = d
								} else {
									e.sortcolumn = null
								}
								if (e.source.sort) {
									e.dataview.sortfield = d;
									if (f == null) {
										e.dataview.sortfielddirection = ""
									} else {
										e.dataview.sortfielddirection = ascending ? "asc"
												: "desc"
									}
									if (e.source.sort && !this._loading) {
										e.source.sort(d, f)
									}
								}
								e.dataview.sortby(d, f);
								e._raiseEvent("sort", {
									sortcolumn : this.sortcolumn,
									sortdirection : this.sortdirection
								})
							}
							if (!this.serverProcessing) {
								this.refresh()
							} else {
								this.updatebounddata("sort")
							}
						},
						_togglesort : function(d) {
							var f = this;
							if (this.disabled) {
								return
							}
							if (d.sortable && f.sortable) {
								var c = {
									sortcolumn : this.sortcolumn,
									sortdirection : this.sortdirection
								};
								var e = null;
								if (c.sortcolumn != null
										&& c.sortcolumn == d.displayfield) {
									e = c.sortdirection.ascending;
									if (e == true) {
										e = false
									} else {
										e = null
									}
								} else {
									e = true
								}
								f.sortby(d.displayfield, e)
							}
						},
						_renderfilter : function() {
							var h = this;
							var j = b("<div style='position: relative; margin: 4px;'><input role='textbox' type='text'/><div style='cursor: pointer; height: 100%;'><div></div></div></div>");
							j.height(22);
							var o = j.find("input");
							var g = j.find("div:first");
							j.addClass(this.toThemeProperty("jqx-rc-all"));
							j.addClass(this.toThemeProperty("jqx-widget"));
							j.addClass(this.toThemeProperty("jqx-input-group"));
							o.addClass(this.toThemeProperty("jqx-input"));
							o.addClass(this.toThemeProperty("jqx-rc-l"));
							o.addClass(this
									.toThemeProperty("jqx-input-group-addon"));
							o.addClass(this.toThemeProperty("jqx-widget"));
							o.addClass(this
									.toThemeProperty("jqx-widget-content"));
							g.addClass(this
									.toThemeProperty("jqx-fill-state-normal"));
							g.addClass(this.toThemeProperty("jqx-rc-r"));
							g.addClass(this
									.toThemeProperty("jqx-input-group-addon"));
							g.find("div").addClass(
									this.toThemeProperty("jqx-icon-search"));
							this.filter.children().remove();
							this.filterbutton = g;
							var d = new Array();
							for (var f = 0; f < h.columns.records.length; f++) {
								if (h.columns.records[f].datafield
										&& h.columns.records[f].filterable) {
									d
											.push({
												label : h.columns.records[f].text,
												value : h.columns.records[f].displayfield
											})
								}
							}
							var p = d.length < 10 ? true : false;
							var l = b("<div style='position: relative; top: 50%; display: none; margin-right: 4px; margin-left: 4px; float: left;'>"
									+ this.gridlocalization.filtersearchstring
									+ "</div>");
							this.filter.append(l);
							var c = b("<div class='filtercolumns' style='margin: 4px; float: left;'></div>");
							this.filter.append(c);
							if (c.jqxDropDownList) {
								c.jqxDropDownList({
									theme : this.theme,
									autoDropDownHeight : p,
									rtl : h.rtl,
									dropDownWidth : 220,
									selectedIndex : 0,
									width : "auto",
									height : 20,
									source : d,
									displayMember : "label",
									valueMember : "value"
								})
							}
							this.filtercolumnsList = c;
							var n = function(q) {
								h.filterinput.val("");
								for (var r = 0; r < h.dataview.filters.length; r++) {
									var s = h.dataview.filters[r];
									if (s.datafield === q) {
										h.filterinput.val(s.filter
												.getfilterat(0).filtervalue)
									}
								}
							};
							h._updateSimpleFilter = n;
							this.addHandler(c, "select", function(q) {
								var i = q.args.item.value;
								n(i)
							});
							if (this.filtermode === "simple") {
								this.filtercolumnsList.hide();
								l.show();
								l.css("margin-top", -this.filter.height() / 2)
							} else {
								this.filtercolumnsList.show();
								l.hide()
							}
							var m = function() {
								if (!g.hasClass("jqx-fill-state-disabled")) {
									var r = o.val();
									if (c.jqxDropDownList) {
										var u = c
												.jqxDropDownList("getSelectedItem")
									}
									var w = function(B, x, i) {
										var A = new b.jqx.filter();
										var z = h.getcolumntypebydatafield(B);
										var C = h._getfiltertype(z);
										if (C == "datefilter") {
											var y = A.createfilter(C, x,
													"EQUAL", null,
													B.cellsformat,
													h.gridlocalization)
										} else {
											if (C == "numericfilter"
													|| C == "booleanfilter") {
												if (C == "numericfilter") {
													if (h.gridlocalization.decimalseparator == ",") {
														if (x
																.indexOf(h.gridlocalization.decimalseparator) >= 0) {
															x = x
																	.replace(
																			h.gridlocalization.decimalseparator,
																			".")
														}
													}
													if (x
															.indexOf(h.gridlocalization.currencysymbol) >= 0) {
														x = x
																.replace(
																		h.gridlocalization.currencysymbol,
																		"")
													}
													if (x
															.indexOf(h.gridlocalization.percentagesymbol) >= 0) {
														x = x
																.replace(
																		h.gridlocalization.percentagesymbol,
																		"")
													}
												}
												var y = A.createfilter(C, x,
														"EQUAL", null,
														B.cellsformat,
														h.gridlocalization)
											} else {
												var y = A.createfilter(C, x,
														"CONTAINS")
											}
										}
										A.operator = i;
										A.addfilter(0, y);
										return A
									};
									if (h.filtermode !== "simple") {
										if (u) {
											var v = u.value;
											var t = h.getcolumn(v);
											var s = w(t, r, "and");
											if (r.length > 0) {
												h.removefilter(v);
												h.addfilter(v, s);
												h.applyfilters()
											} else {
												h.removefilter(v);
												h.applyfilters()
											}
											if (h.filtermode === "advanced") {
												if (h._updateFilterRow) {
													h._updateFilterRow(true)
												}
											}
										}
									} else {
										h.clearfilters(false, false);
										if (r.length > 0) {
											for (var q = 0; q < h.columns.records.length; q++) {
												var t = h.columns.records[q];
												var s = w(t, r, "or");
												h.addfilter(t.datafield, s)
											}
										}
										h.applyfilters()
									}
									if (h.dataview.filters.length == 0) {
										h.filtericon.fadeOut(200)
									} else {
										h.filtericon.fadeIn(200)
									}
								}
							};
							o.keydown(function(i) {
								if (i.keyCode === 13) {
									m();
									if (i.preventDefault) {
										i.preventDefault()
									}
									return false
								}
							});
							g.click(function() {
								m()
							});
							this.filterinput = o;
							this.filter.append(j);
							if (this.filtermode == "advanced") {
								var e = b("<a style='float: left; position: relative; margin: 2px; margin-left: 10px;' href='#'>"
										+ this.gridlocalization.filterstring
										+ "</a>");
								j.append(e);
								this
										.addHandler(
												e,
												"click",
												function(q) {
													var i = function(t) {
														if (h.filterrow) {
															for (var w = 0; w < h.filterrow[0].cells.length; w++) {
																var s = h.filterrow[0].cells[w];
																var u = b(s)
																		.find(
																				"input:first");
																var y = h.columns.records[w];
																if (!y.filterable) {
																	continue
																}
																if (t === true) {
																	u.val("")
																}
																for (var v = 0; v < h.dataview.filters.length; v++) {
																	var x = h.dataview.filters[v];
																	if (x.datafield === y.displayfield) {
																		u
																				.val(x.filter
																						.getfilterat(0).filtervalue);
																		break
																	}
																}
															}
														}
													};
													h._updateFilterRow = i;
													var r = function() {
														h.filtercolumnsList
																.jqxDropDownList({
																	disabled : true
																});
														h.filterinput
																.addClass(h
																		.toThemeProperty("jqx-fill-state-disabled"));
														h.filterinput.attr(
																"disabled",
																true);
														h.filterbutton
																.addClass(h
																		.toThemeProperty("jqx-fill-state-disabled"))
													};
													if (h.filter
															.find(".filterrow").length === 0) {
														h
																._renderadvancedfilter();
														r();
														i();
														h._arrange()
													} else {
														if (h.filter.find(
																".filterrow")
																.css("display") === "none") {
															r();
															h.filter
																	.find(
																			".filterrow")
																	.removeClass(
																			"filterrow-hidden");
															i();
															h.filter
																	.find(
																			".filterrow")
																	.show()
														} else {
															h.filtercolumnsList
																	.jqxDropDownList({
																		disabled : false
																	});
															h.filterinput
																	.removeClass(h
																			.toThemeProperty("jqx-fill-state-disabled"));
															h.filterinput.attr(
																	"disabled",
																	false);
															h.filterbutton
																	.removeClass(h
																			.toThemeProperty("jqx-fill-state-disabled"));
															n(h.filtercolumnsList
																	.jqxDropDownList("getSelectedItem").value);
															h.filter
																	.find(
																			".filterrow")
																	.addClass(
																			"filterrow-hidden");
															h.filter
																	.find(
																			".filterrow")
																	.hide()
														}
														h._arrange()
													}
													return false
												})
							}
							var k = b("<div style='float: left; width: 16px; height: 16px; position: relative; margin: 3px;'></div>");
							k.attr("title",
									h.gridlocalization.filterclearstring);
							k.addClass(h.toThemeProperty("jqx-icon-close"));
							j.append(k);
							k.hide();
							h.filtericon = k;
							k.click(function() {
								h.clearfilters();
								h.filtericon.fadeOut(200)
							})
						},
						_renderadvancedfilter : function() {
							var g = this;
							var c = function() {
								g.clearfilters(false, false);
								var n = g.filtercolumnsList
										.jqxDropDownList("getSelectedItem").value;
								var p = g.filterinput.val();
								for (var m = 0; m < g.filterrow[0].cells.length; m++) {
									var t = g.filterrow[0].cells[m];
									var s = b(t).find("input:first");
									var q = b(t).find(".filterconditions");
									var l = g.columns.records[m];
									var k = "";
									if (!l.filterable) {
										continue
									}
									if (l.displayfield === n) {
										g.filterinput.val(s.val())
									}
									var o = g.getcolumntypebydatafield(l);
									var j = new b.jqx.filter();
									switch (o) {
									case "number":
									case "int":
									case "float":
									case "decimal":
										filtertype = "numericfilter";
										conditions = j
												.getoperatorsbyfiltertype("numericfilter");
										break;
									case "boolean":
									case "bool":
										filtertype = "booleanfilter";
										conditions = j
												.getoperatorsbyfiltertype("booleanfilter");
										break;
									case "date":
									case "time":
										filtertype = "datefilter";
										conditions = j
												.getoperatorsbyfiltertype("datefilter");
										break;
									case "string":
										filtertype = "stringfilter";
										conditions = j
												.getoperatorsbyfiltertype("stringfilter");
										break
									}
									if (q.length == 0) {
										if (filtertype === "stringfilter") {
											k = conditions[2]
										} else {
											k = conditions[0]
										}
									} else {
										var w = q
												.jqxDropDownList("getSelectedItem");
										if (w) {
											k = conditions[w.index]
										} else {
											if (filtertype === "stringfilter") {
												k = conditions[2]
											} else {
												k = conditions[0]
											}
										}
									}
									var u = s.val();
									if (u.length > 0) {
										var r = l.displayfield;
										var v = new b.jqx.filter();
										if (filtertype == "numericfilter") {
											if (g.gridlocalization.decimalseparator == ",") {
												if (u
														.indexOf(g.gridlocalization.decimalseparator) >= 0) {
													u = u
															.replace(
																	g.gridlocalization.decimalseparator,
																	".")
												}
											}
											if (u
													.indexOf(g.gridlocalization.currencysymbol) >= 0) {
												u = u
														.replace(
																g.gridlocalization.currencysymbol,
																"")
											}
											if (u
													.indexOf(g.gridlocalization.percentagesymbol) >= 0) {
												u = u
														.replace(
																g.gridlocalization.percentagesymbol,
																"")
											}
										}
										var j = v.createfilter(filtertype, u,
												k, null, l.cellsformat,
												g.gridlocalization);
										v.addfilter(0, j);
										if (u.length > 0) {
											g.addfilter(r, v)
										}
									}
								}
								if (g.dataview.filters.length > 0) {
									g.applyfilters()
								} else {
									g.clearfilters()
								}
								if (g.dataview.filters.length == 0) {
									g.filtericon.fadeOut(200)
								} else {
									g.filtericon.fadeIn(200)
								}
							};
							var d = function() {
								var l = b(
										"<div style='position: relative;' class='filterrow'></div>")
										.appendTo(g.filter);
								g.filterrow = l;
								l[0].cells = new Array();
								l.height(24);
								l.width(g.table.width());
								var j = 0;
								var i = g.filtercolumnsList
										.jqxDropDownList("getSelectedItem").value;
								var k = g.filterinput.val();
								b
										.each(
												g.columns.records,
												function() {
													var o = this;
													var m = b("<div></div>")
															.appendTo(l);
													m.css("position",
															"absolute");
													m
															.css(
																	"left",
																	o.uielement[0].style.left);
													if (o.pinned) {
														m
																.css(
																		"z-index",
																		g.tableZIndex
																				+ g.columns.records.length);
														m
																.addClass(g
																		.toThemeProperty("jqx-widget-header"))
													}
													l[0].cells.push(m[0]);
													if (!this.filterable) {
														return true
													}
													var n = b(
															"<input style='margin-left: 4px; height: 20px; float: left;' role='textbox' type='text'/>")
															.appendTo(m);
													n.keydown(function(q) {
														if (q.keyCode === 13) {
															c()
														}
													});
													if (o.displayfield === i) {
														n.val(k)
													}
													n
															.addClass(g
																	.toThemeProperty("jqx-input"));
													n
															.addClass(g
																	.toThemeProperty("jqx-rc-all"));
													n
															.addClass(g
																	.toThemeProperty("jqx-widget"));
													n
															.addClass(g
																	.toThemeProperty("jqx-widget-content"));
													var p = b(
															"<div style='cursor: pointer; margin-left: 4px; margin-bottom: 4px; margin-top: 6px; width: 18px; position: relative; margin-top: 4px; float: left;'></div>")
															.appendTo(m);
													p
															.append(b("<div style='width: 16px; height: 16px;' class='"
																	+ g
																			.toThemeProperty("jqx-grid-column-filterbutton")
																	+ "'></div>"));
													n
															.focus(function() {
																g
																		.ensurecolumnvisible(o.displayfield);
																g.filter[0].scrollLeft = 0;
																g
																		.ensurecolumnvisible(o.displayfield);
																setTimeout(
																		function() {
																			g.filter[0].scrollLeft = 0;
																			g
																					.ensurecolumnvisible(o.displayfield)
																		}, 10)
															});
													p
															.click(function() {
																var s = b("<div class='filterconditions' style='position: relative; margin-top: 1px; float: left;'></div>");
																s
																		.insertAfter(p);
																p.remove();
																var q = g
																		.getcolumntypebydatafield(o);
																var r = g
																		._getfiltersbytype(q);
																if (q === "string") {
																	index = 2
																} else {
																	index = 0
																}
																s
																		.jqxDropDownList({
																			theme : g.theme,
																			enableBrowserBoundsDetection : true,
																			renderMode : "simple",
																			arrowSize : 0,
																			selectedIndex : index,
																			rtl : g.rtl,
																			dropDownWidth : 230,
																			dropDownHeight : 180,
																			width : 20,
																			height : 20,
																			source : r,
																			selectionRenderer : function() {
																				return "<div style='width: 16px; height: 16px;' class='"
																						+ g
																								.toThemeProperty("jqx-grid-column-filterbutton")
																						+ "'></div>"
																			}
																		});
																g
																		.addHandler(
																				s,
																				"close",
																				function(
																						t) {
																					n
																							.focus();
																					setTimeout(
																							function() {
																								n
																										.focus()
																							},
																							10)
																				});
																s
																		.removeAttr("tabindex");
																s
																		.find(
																				"div")
																		.removeAttr(
																				"tabindex");
																s
																		.jqxDropDownList("open")
															});
													n[0].style.width = o.width
															- 6 - 22 + "px"
												});
								b("<div style='clear: both;'></div>").appendTo(
										l)
							};
							d();
							var h = b("<div class='filterrow'></div>")
									.appendTo(g.filter);
							var e = b(
									"<input type='button' style='float: left; margin-top: 4px; margin-left: 4px;' value='"
											+ g.gridlocalization.filterapplystring
											+ "'/>").appendTo(h);
							var f = b(
									"<input type='button' style='float: left; margin-top: 4px;  margin-left: 4px;' value='"
											+ g.gridlocalization.filtercancelstring
											+ "'/>").appendTo(h);
							e.jqxButton({
								theme : g.theme
							});
							f.jqxButton({
								theme : g.theme
							});
							f
									.click(function() {
										g.filtercolumnsList.jqxDropDownList({
											disabled : false
										});
										g.filterinput
												.removeClass(g
														.toThemeProperty("jqx-fill-state-disabled"));
										g.filterinput.attr("disabled", false);
										g.filterbutton
												.removeClass(g
														.toThemeProperty("jqx-fill-state-disabled"));
										g.filter.find(".filterrow").addClass(
												"filterrow-hidden");
										g.filter.find(".filterrow").hide();
										g._arrange()
									});
							e.click(function() {
								c()
							});
							g._renderhorizontalscroll()
						},
						_getfiltertype : function(c) {
							var d = "stringfilter";
							switch (c) {
							case "number":
							case "int":
							case "float":
							case "decimal":
								d = "numericfilter";
								break;
							case "boolean":
							case "bool":
								d = "booleanfilter";
								break;
							case "date":
							case "time":
								d = "datefilter";
								break;
							case "string":
								d = "stringfilter";
								break
							}
							return d
						},
						getcolumntypebydatafield : function(e) {
							var f = this;
							var d = "string";
							var c = f.source.datafields
									|| ((f.source._source) ? f.source._source.datafields
											: null);
							if (c) {
								var g = "";
								b.each(c, function() {
									if (this.name == e.displayfield) {
										if (this.type) {
											g = this.type
										}
										return false
									}
								});
								if (g) {
									return g
								}
							}
							return d
						},
						_getfiltersbytype : function(c) {
							var d = this;
							var e = "";
							switch (c) {
							case "number":
							case "float":
							case "int":
								e = d.gridlocalization.filternumericcomparisonoperators;
								break;
							case "date":
								e = d.gridlocalization.filterdatecomparisonoperators;
								break;
							case "boolean":
							case "bool":
								e = d.gridlocalization.filterbooleancomparisonoperators;
								break;
							case "string":
							default:
								e = d.gridlocalization.filterstringcomparisonoperators;
								break
							}
							return e
						},
						_getcellvalue : function(c, e) {
							var d = null;
							d = e[c.datafield];
							if (c.displayfield != null) {
								d = e[c.displayfield]
							}
							if (d == null) {
								d = ""
							}
							return d
						},
						_renderrows : function() {
							if (this.editable) {
								if (this.editKey != null) {
									var J = this.endroweditbykey(this.editKey)
								}
							}
							if (this.treeGrid) {
								this.treeGrid._renderrows();
								return
							}
							if (this._loading) {
								return
							}
							if (this._updating) {
								return
							}
							if (this.rendering) {
								this.rendering()
							}
							var Y = this;
							var Q = 0;
							this.table[0].rows = new Array();
							var E = this.toTP("jqx-cell") + " "
									+ this.toTP("jqx-widget-content");
							if (this.rtl) {
								E += " " + this.toTP("jqx-cell-rtl")
							}
							var H = this.columns.records.length;
							var ak = b.jqx.browser.msie
									&& b.jqx.browser.version < 8;
							if (ak) {
								this.host.attr("hideFocus", "true")
							}
							var O = Y.groups.length;
							var af = new Array();
							var g = this.source.records;
							g = this.dataview.evaluate(g);
							this.dataViewRecords = g;
							if (this.dataview.pagesize == "all"
									|| !this.pageable || this.serverProcessing) {
								var s = g;
								if (this.pageable && this.serverProcessing
										&& g.length > this.dataview.pagesize) {
									var s = g.slice(this.dataview.pagesize
											* this.dataview.pagenum,
											this.dataview.pagesize
													* this.dataview.pagenum
													+ this.dataview.pagesize)
								}
							} else {
								var s = g.slice(this.dataview.pagesize
										* this.dataview.pagenum,
										this.dataview.pagesize
												* this.dataview.pagenum
												+ this.dataview.pagesize)
							}
							if (Y.groups && Y.groups.length > 0) {
								var M = this.pageable ? this.dataview.pagesize
										* this.dataview.pagenum : 0;
								var u = Y.source.getGroupedRecords(Y.groups,
										"records", "label", null, "data", null,
										"parent", s, M);
								var v = function(j, w) {
									for (var ap = 0; ap < j.length; ap++) {
										var c = j[ap];
										w.push(c);
										if (c.records && c.records.length > 0) {
											var aq = v(c.records, new Array());
											for (var ao = 0; ao < aq.length; ao++) {
												if (aq[ao].leaf) {
													w.push(aq[ao])
												} else {
													w.push(aq[ao])
												}
											}
										}
									}
									return w
								};
								var af = v.call(Y, u, new Array());
								s = af;
								this.rowsByKey = new Array();
								for (var aj = 0; aj < s.length; aj++) {
									var D = s[aj];
									this.rowsByKey[D.uid] = D
								}
							}
							var af = s;
							this.renderedRecords = af;
							var X = af.length;
							var R = this.tableZIndex;
							var al = 0;
							var W = 0;
							if (ak) {
								for (var ai = 0; ai < H; ai++) {
									var V = this.columns.records[ai];
									var e = V.width;
									if (e < V.minwidth) {
										e = V.minwidth
									}
									if (e > V.maxwidth) {
										e = V.maxwidth
									}
									var h = b('<table><tr><td role="gridcell" style="max-width: '
											+ e
											+ "px; width:"
											+ e
											+ 'px;" class="'
											+ E
											+ '"></td></tr></table>');
									b(document.body).append(h);
									var l = h.find("td");
									al = 1 + parseInt(l.css("padding-left"))
											+ parseInt(l.css("padding-right"));
									h.remove();
									break
								}
							}
							var ah = this.rtl ? " "
									+ this.toTP("jqx-grid-table-rtl") : "";
							var y = "<table cellspacing='0' cellpadding='0' class='"
									+ this.toTP("jqx-grid-table")
									+ ah
									+ "' id='table"
									+ this.element.id
									+ "'><colgroup>";
							var am = "<table cellspacing='0' cellpadding='0' class='"
									+ this.toTP("jqx-grid-table")
									+ ah
									+ "' id='pinnedtable"
									+ this.element.id
									+ "'><colgroup>";
							var F = 0;
							var r = H;
							for (var ai = 0; ai < H; ai++) {
								var V = this.columns.records[ai];
								if (V.hidden) {
									F++;
									r--;
									continue
								}
								var e = V.width;
								if (e < V.minwidth) {
									e = V.minwidth
								}
								if (e > V.maxwidth) {
									e = V.maxwidth
								}
								e -= al;
								if (e < 0) {
									e = 0
								}
								if (ak) {
									var Z = e;
									if (ai == F) {
										Z++
									}
									if (V.rowdetailscolumn) {
										var Z = Z + 4;
										am += "<col style='max-width: " + Z
												+ "px; width: " + Z + "px;'>";
										y += "<col style='max-width: " + Z
												+ "px; width: " + Z + "px;'>"
									} else {
										am += "<col style='max-width: " + Z
												+ "px; width: " + Z + "px;'>";
										y += "<col style='max-width: " + Z
												+ "px; width: " + Z + "px;'>"
									}
								} else {
									am += "<col style='max-width: " + e
											+ "px; width: " + e + "px;'>";
									y += "<col style='max-width: " + e
											+ "px; width: " + e + "px;'>"
								}
								W += e
							}
							y += "</colgroup>";
							am += "</colgroup>";
							this._hiddencolumns = false;
							var f = false;
							if (this.rowdetails && this._pinnedTable) {
								this._pinnedTable.find("[data-role=details]")
										.detach();
								this._table.find("[data-role=details]")
										.detach()
							}
							if (X === 0) {
								var n = '<tr role="row">';
								var k = this.host.height();
								if (this.pageable) {
									k -= this.pagerheight;
									if (this.pagerposition === "both") {
										k -= this.pagerheight
									}
								}
								k -= this.columnsheight;
								if (this.filterable) {
									var ad = this.filter.find(".filterrow");
									var A = this.filter
											.find(".filterrow-hidden");
									var z = 1;
									if (A.length > 0) {
										z = 0
									}
									k -= this.filterheight + this.filterheight
											* ad.length * z
								}
								if (this.showstatusbar) {
									k -= this.statusbarheight
								}
								if (this.showaggregates) {
									k -= this.aggregatesheight
								}
								if (k < 25) {
									k = 25
								}
								if (this.hScrollBar[0].style.visibility != "hidden") {
									k -= this.hScrollBar.outerHeight()
								}
								if (this.height === "auto"
										|| this.height === null
										|| this.autoheight) {
									k = 300
								}
								var h = '<td colspan="'
										+ this.columns.records.length
										+ '" role="gridcell" style="border: none; min-height: '
										+ k + "px; height: " + k
										+ "px; max-width:" + W + "px; width:"
										+ W + "px;";
								var E = this.toTP("jqx-cell") + " "
										+ this.toTP("jqx-grid-cell") + " "
										+ this.toTP("jqx-item");
								E += " " + this.toTP("jqx-center-align");
								h += '" class="' + E + '">';
								h += this.gridlocalization.emptydatastring;
								h += "</td>";
								n += h;
								y += n;
								am += n;
								this.table[0].style.width = W + 2 + "px";
								Q = W
							}
							var p = this.getRows();
							for (var aj = 0; aj < af.length; aj++) {
								var D = af[aj];
								var I = D.uid;
								if (undefined === D.uid) {
									D.uid = this.dataview.generatekey()
								}
								var n = '<tr data-key="' + I
										+ '" role="row" id="row' + aj
										+ this.element.id + '">';
								var B = '<tr data-key="' + I
										+ '" role="row" id="row' + aj
										+ this.element.id + '">';
								if (O > 0) {
									if (D.level < O) {
										var n = '<tr data-role="row-group" data-key="'
												+ I
												+ '" role="row" id="row'
												+ aj + this.element.id + '">';
										var B = '<tr data-role="row-group" data-key="'
												+ I
												+ '" role="row" id="row'
												+ aj + this.element.id + '">'
									}
								}
								var o = 0;
								var P = 0;
								for (var ai = 0; ai < H; ai++) {
									var ab = this.columns.records[ai];
									if (ab.pinned
											|| (this.rtl && this.columns.records[H - 1].pinned)) {
										f = true
									}
									var e = ab.width;
									if (e < ab.minwidth) {
										e = ab.minwidth
									}
									if (e > ab.maxwidth) {
										e = ab.maxwidth
									}
									e -= al;
									if (e < 0) {
										e = 0
									}
									var E = this.toTP("jqx-cell") + " "
											+ this.toTP("jqx-grid-cell") + " "
											+ this.toTP("jqx-item");
									if (ab.pinned) {
										E += " "
												+ this
														.toTP("jqx-grid-cell-pinned")
									}
									if (this.sortcolumn === ab.displayfield) {
										E += " "
												+ this
														.toTP("jqx-grid-cell-sort")
									}
									if (this.altrows && aj % 2 != 0) {
										E += " "
												+ this
														.toTP("jqx-grid-cell-alt")
									}
									if (this.rtl) {
										E += " " + this.toTP("jqx-cell-rtl")
									}
									var L = "";
									if (O > 0) {
										if (D.level < O) {
											if (!ak) {
												E += " "
														+ this
																.toTP("jqx-grid-cell-pinned");
												L += ' colspan="' + H + '"';
												var Z = 0;
												for (var aa = 0; aa < H; aa++) {
													var an = Y.columns.records[aa];
													var x = an.width;
													if (x < an.minwidth) {
														e = an.minwidth
													}
													if (x > an.maxwidth) {
														e = an.maxwidth
													}
													x -= al;
													if (x < 0) {
														x = 0
													}
													if (!an.hidden) {
														Z += x
													}
												}
												e = Z
											} else {
												E += " "
														+ this
																.toTP("jqx-grid-cell-pinned")
											}
										}
									}
									var h = '<td role="gridcell" ' + L
											+ ' style="max-width:' + e
											+ "px; width:" + e + "px;";
									var ac = '<td role="gridcell" '
											+ L
											+ ' style="pointer-events: none; visibility: hidden; border-color: transparent; max-width:'
											+ e + "px; width:" + e + "px;";
									if (ai == H - 1 && H == 1) {
										h += "border-right-color: transparent;";
										ac += "border-right-color: transparent;"
									}
									var U = false;
									if (O > 0) {
										if (D.level < O) {
											U = true
										}
									}
									if (!U) {
										if (ab.cellsalign != "left") {
											if (ab.cellsalign === "right") {
												E += " "
														+ this
																.toTP("jqx-right-align")
											} else {
												E += " "
														+ this
																.toTP("jqx-center-align")
											}
										}
									} else {
										if (this.rtl) {
											E += " "
													+ this
															.toTP("jqx-right-align")
										}
									}
									if (this.rowinfo[D.uid]) {
										if (this.rowinfo[D.uid].selected
												&& !ab.rowdetailscolumn) {
											if (this.editKey !== D.uid) {
												if (this.selectionmode !== "none") {
													E += " "
															+ this
																	.toTP("jqx-grid-cell-selected");
													E += " "
															+ this
																	.toTP("jqx-fill-state-pressed")
												}
											}
										}
										if (this.rowinfo[D.uid].locked) {
											E += " "
													+ this
															.toTP("jqx-grid-cell-locked")
										}
									}
									if (!(ab.hidden)) {
										o += al + e;
										if (P == 0) {
											h += "border-left-width: 0px;";
											ac += "border-left-width: 0px;"
										}
										P++
									} else {
										if (!U) {
											h += "display: none;";
											ac += "display: none;";
											this._hiddencolumns = true
										}
									}
									if (O > 0 && ak && U && ai >= O) {
										h += "font-size: 1px; border-color: transparent;  color: transparent;";
										ac += "font-size: 1px; border-color: transparent; color: transparent;"
									}
									if (ab.pinned) {
										h += "pointer-events: auto;";
										ac += "pointer-events: auto;"
									}
									if (!U && ab.rowdetailscolumn) {
										if (this.rowinfo[D.uid]) {
											if (!this.rowinfo[D.uid].nodetails) {
												if (this.rowinfo[D.uid].expanded) {
													if (!this.rtl) {
														E += " "
																+ this
																		.toTP("jqx-grid-group-expand")
													} else {
														E += " "
																+ this
																		.toTP("jqx-grid-group-expand-rtl")
													}
													E += " "
															+ this
																	.toTP("jqx-icon-arrow-down")
												} else {
													if (!this.rtl) {
														E += " "
																+ this
																		.toTP("jqx-grid-group-collapse");
														E += " "
																+ this
																		.toTP("jqx-icon-arrow-right")
													} else {
														E += " "
																+ this
																		.toTP("jqx-grid-group-collapse-rtl");
														E += " "
																+ this
																		.toTP("jqx-icon-arrow-left")
													}
												}
											}
										} else {
											if (!this.rtl) {
												E += " "
														+ this
																.toTP("jqx-grid-group-collapse");
												E += " "
														+ this
																.toTP("jqx-icon-arrow-right")
											} else {
												E += " "
														+ this
																.toTP("jqx-grid-group-collapse-rtl");
												E += " "
														+ this
																.toTP("jqx-icon-arrow-left")
											}
										}
									}
									if (!this.autorowheight) {
										E += " "
												+ this
														.toTP("jqx-grid-cell-nowrap ")
									}
									var ag = Y._getcellvalue(ab, D);
									if (O > 0) {
										if (D.level < O) {
											ag = D.label
										}
									}
									if (ab.cellsformat != "") {
										if (b.jqx.dataFormat) {
											if (b.jqx.dataFormat.isDate(ag)) {
												ag = b.jqx.dataFormat
														.formatdate(
																ag,
																ab.cellsformat,
																Y.gridlocalization)
											} else {
												if (b.jqx.dataFormat
														.isNumber(ag)
														|| (!isNaN(parseFloat(ag)) && isFinite(ag))) {
													ag = b.jqx.dataFormat
															.formatnumber(
																	ag,
																	ab.cellsformat,
																	Y.gridlocalization)
												}
											}
										}
									}
									if (!U) {
										if (ab.cellclassname != ""
												&& ab.cellclassname) {
											if (typeof ab.cellclassname == "string") {
												E += " " + ab.cellclassname
											} else {
												var q = ab.cellclassname(aj,
														ab.datafield, ag, D);
												if (q) {
													E += " " + q
												}
											}
										}
										if (ab.cellsrenderer != ""
												&& ab.cellsrenderer) {
											var d = p.indexOf(D);
											ag = ab.cellsrenderer(d,
													ab.datafield, ag, D)
										}
									} else {
										if (this.groupsrenderer) {
											ag = this.groupsrenderer(ag, D,
													D.level)
										}
									}
									h += '" class="' + E + '">';
									h += ag;
									h += "</td>";
									ac += '" class="' + E + '">';
									ac += ag;
									ac += "</td>";
									if (!ab.pinned) {
										n += h;
										if (f) {
											B += ac
										}
									} else {
										B += h;
										n += h
									}
									if (O > 0 && !ak) {
										if (D.level < O) {
											break
										}
									}
								}
								if (Q == 0) {
									this.table[0].style.width = o + 2 + "px";
									Q = o
								}
								n += "</tr>";
								B += "</tr>";
								y += n;
								am += B;
								if (!this.rowinfo[D.uid]) {
									this.rowinfo[D.uid] = {
										group : U,
										row : D,
										details : null,
										detailsHeight : 200,
										initialized : false,
										expanded : false
									}
								}
								if (this.serverProcessing) {
									this.rowinfo[D.uid].row = D
								}
								if (this.rowdetails) {
									var C = this.rowinfo[D.uid].detailsHeight;
									if (this.rowinfo[D.uid]) {
										if (this.rowinfo[D.uid].expanded) {
											var ae = '<tr data-role="row-details"><td valign="top" style="pointer-events: auto; overflow: hidden; min-height: '
													+ C
													+ "px; max-height: "
													+ C
													+ "px; height: "
													+ C
													+ 'px; overflow: hidden; border-left: none; border-right: none;" colspan="'
													+ this.columns.records.length
													+ '" role="gridcell"'
										} else {
											var ae = '<tr data-role="row-details" style="display: none;"><td valign="top" style="pointer-events: auto; overflow: hidden; min-height: '
													+ C
													+ "px; max-height: "
													+ C
													+ "px; height: "
													+ C
													+ 'px; overflow: hidden; border-left: none; border-right: none;" colspan="'
													+ this.columns.records.length
													+ '" role="gridcell"'
										}
									} else {
										var ae = '<tr data-role="row-details" style="display: none;"><td valign="top" style="pointer-events: auto; overflow: hidden; min-height: '
												+ C
												+ "px; max-height: "
												+ C
												+ "px; height: "
												+ C
												+ 'px; overflow: hidden; border-left: none; border-right: none;" colspan="'
												+ this.columns.records.length
												+ '" role="gridcell"'
									}
									var E = this.toTP("jqx-cell") + " "
											+ this.toTP("jqx-grid-cell") + " "
											+ this.toTP("jqx-item");
									E += " " + this.toTP("jqx-details");
									E += " " + this.toTP("jqx-reset");
									ae += '" class="'
											+ E
											+ '"><div style="pointer-events: auto; overflow: hidden; min-height: '
											+ C
											+ "px; max-height: "
											+ C
											+ "px; height: "
											+ C
											+ 'px;"><div data-role="details"></div></div></td></tr>';
									y += ae;
									am += ae
								}
							}
							y += "</table>";
							am += "</table>";
							if (f) {
								if (Y.WinJS) {
									MSApp.execUnsafeLocalFunction(function() {
										Y.table.html(am + y)
									})
								} else {
									Y.table[0].innerHTML = am + y
								}
								var S = this.table.find("#table"
										+ this.element.id);
								var T = this.table.find("#pinnedtable"
										+ this.element.id);
								T.css("float", "left");
								T.css("pointer-events", "none");
								S.css("float", "left");
								T[0].style.position = "absolute";
								S[0].style.position = "relative";
								S[0].style.zIndex = R - 10;
								T[0].style.zIndex = R + 10;
								this._table = S;
								this._table[0].style.left = "0px";
								this._pinnedTable = T;
								this._pinnedTable[0].style.left = "0px";
								this._pinnedTable[0].style.width = Q + "px";
								this._table[0].style.width = Q + "px";
								if (this.rtl) {
									if (Q > parseInt(this.element.style.width)
											&& this._haspinned) {
										this._pinnedTable[0].style.left = 3
												- Q
												+ parseInt(this.element.style.width)
												+ "px"
									}
								}
								if (this.rowdetails) {
									for (var aj = 0; aj < X; aj++) {
										var D = af[aj];
										var I = D.uid;
										if (this.rowinfo[I].details) {
											var K = b(this._table.children()[1])
													.children(
															("[data-key=" + I + "]"));
											var N = b(
													this._pinnedTable
															.children()[1])
													.children(
															("[data-key=" + I + "]"));
											if (K) {
												var m = N.next();
												var G = b(b(m).children()
														.children());
												G.children().detach();
												G
														.append(this.rowinfo[D.uid].details)
											}
										}
									}
								}
							} else {
								if (Y.WinJS) {
									MSApp.execUnsafeLocalFunction(function() {
										Y.table.html(y)
									})
								} else {
									Y.table[0].innerHTML = y
								}
								var aa = this.table.find("#table"
										+ this.element.id);
								this._table = aa;
								if (b.jqx.browser.msie
										&& b.jqx.browser.version < 10) {
									this._table[0].style.width = Q + "px"
								}
								if (X === 0) {
									this._table[0].style.width = (2 + Q) + "px"
								}
							}
							if (X === 0) {
								this._table[0].style.tableLayout = "auto";
								if (this._pinnedTable) {
									this._pinnedTable[0].style.tableLayout = "auto"
								}
							}
							if (this.rendered) {
								this.rendered()
							}
						},
						getcolumnindex : function(c) {
							var d = this.getcolumn(c);
							var e = this.columns.records.indexOf(d);
							return e
						},
						setcolumnindex : function(e, i, j) {
							var h = this.getcolumn(e);
							if (h.pinned) {
								return
							}
							if (h.hidden) {
								return
							}
							if (h.checkboxcolumn) {
								return
							}
							if (h.grouped) {
								return
							}
							var l = this.columns.records.indexOf(h);
							this.columns.records.splice(l, 1);
							this.columns.records.splice(i, 0, h);
							var f = 0;
							var n = this.headerZIndex;
							this.columnsrow.children().detach();
							var k = this.toThemeProperty("jqx-grid-cell");
							k += " "
									+ this
											.toThemeProperty("jqx-grid-cell-pinned");
							k += " " + this.toThemeProperty("jqx-item");
							if (this.filterrow) {
								b(this.filterrow.children()[0]).children()
										.detach();
								this.filterrow[0].cells = []
							}
							var m = this;
							var c = null;
							if (m.filterrow != undefined) {
								var c = b(m.filterrow.children()[0])
							}
							this.columnsrow[0].cells = [];
							var g = false;
							b
									.each(
											this.columns.records,
											function(o, r) {
												var p = this.uielement;
												m.columnsrow.append(p);
												if (!m.rtl) {
													p.css("z-index", n--)
												} else {
													p.css("z-index", n++)
												}
												var q = this.width;
												p.css("left", f);
												m.columnsrow[0].cells[m.columnsrow[0].cells.length] = p[0];
												if (m.filterrow) {
													var s = b('<div style="overflow: hidden; position: absolute; height: 100%;" class="'
															+ k + '"></div>');
													c.append(s);
													s.css("left", f);
													s.css("z-index", n + 1);
													s.width(this.width);
													s[0].left = f;
													s
															.append(this._filterwidget);
													m.filterrow[0].cells[m.filterrow[0].cells.length] = s[0]
												}
												if (this.hidden) {
													g = true
												}
												if (!(this.hidden && this.hideable)) {
													f += q
												}
											});
							if (this.groupable) {
								var d = this.groups.length;
								if (d > 0) {
									if (l - d >= 0) {
										l -= d;
										i -= d
									}
								}
							}
							if (this.rowdetails) {
								if (l - 1 >= 0) {
									l--;
									i--
								}
							}
							if (this.selectionmode == "checkbox") {
								if (l - 1 >= 0) {
									l--;
									i--
								}
							}
							var h = this._columns[l];
							this._columns.splice(l, 1);
							this._columns.splice(i, 0, h);
							this.resize();
							this._rendercolumngroups();
							this._raiseEvent("columnReordered", {
								dataField : h.datafield,
								oldIndex : l,
								newIndex : i
							})
						},
						_pinnedColumnsLength : function() {
							var c = 0;
							b.each(this.columns.records, function() {
								if (this.pinned) {
									c++
								}
								if (this.grouped) {
									c++
								}
							});
							if (this.rowdetails) {
								c++
							}
							if (this.selectionmode == "checkbox") {
								c++
							}
							return c
						},
						_handlecolumnsreorder : function() {
							var g = this;
							var h = -1;
							var d = false;
							if (!g.columnsreorder) {
								return
							}
							var f = "mousemove.reorder" + this.element.id;
							var e = "mousedown.reorder" + this.element.id;
							var i = "mouseup.reorder" + this.element.id;
							var c = false;
							if (this.isTouchDevice() && this.touchmode !== true) {
								c = true;
								f = b.jqx.mobile.getTouchEventName("touchmove")
										+ ".reorder" + this.element.id;
								e = b.jqx.mobile
										.getTouchEventName("touchstart")
										+ ".reorder" + this.element.id;
								i = b.jqx.mobile.getTouchEventName("touchend")
										+ ".reorder" + this.element.id
							}
							this.removeHandler(b(document), f);
							this
									.addHandler(
											b(document),
											f,
											function(k) {
												if (g.resizing) {
													return true
												}
												if (g.reordercolumn != null) {
													var l = parseInt(k.pageX);
													var s = parseInt(k.pageY);
													if (c) {
														var p = g.getTouches(k);
														var o = p[0];
														if (o != undefined) {
															l = parseInt(o.pageX);
															s = parseInt(o.pageY)
														}
													}
													var n = g.host.coord();
													var t = parseInt(n.left);
													var u = parseInt(n.top);
													if (g.dragmousedownoffset == undefined
															|| g.dragmousedownoffset == null) {
														g.dragmousedownoffset = {
															left : 0,
															top : 0
														}
													}
													var r = parseInt(l)
															- parseInt(g.dragmousedownoffset.left);
													var j = parseInt(s)
															- parseInt(g.dragmousedownoffset.top);
													g.reordercolumn.css({
														left : r + "px",
														top : j + "px"
													});
													d = false;
													if (l >= t
															&& l <= t
																	+ g.host
																			.width()) {
														if (s >= u
																&& s <= u
																		+ g.host
																				.height()) {
															d = true
														}
													}
													h = -1;
													if (d) {
														g.reordercolumnicon
																.removeClass(g
																		.toThemeProperty("jqx-grid-dragcancel-icon"));
														g.reordercolumnicon
																.addClass(g
																		.toThemeProperty("jqx-grid-drag-icon"));
														var q = g.columnsheader
																.coord();
														var m = q.top
																+ g.columnsheader
																		.height();
														if (g.columnsdropline != null) {
															if (s >= q.top
																	&& s <= m) {
																h = g
																		._handlereordercolumnsdroplines(l)
															} else {
																g.columnsdropline
																		.fadeOut("slow")
															}
														}
													} else {
														if (g.columnsdropline != null) {
															g.columnsdropline
																	.fadeOut("slow")
														}
														g.reordercolumnicon
																.removeClass(g
																		.toThemeProperty("jqx-grid-drag-icon"));
														g.reordercolumnicon
																.addClass(g
																		.toThemeProperty("jqx-grid-dragcancel-icon"))
													}
													if (k.preventDefault) {
														k.preventDefault();
														k.stopPropagation()
													}
													if (c) {
														k.preventDefault();
														k.stopPropagation();
														return false
													}
												}
											});
							this.columnsbounds = new Array();
							this.removeHandler(b(document), e);
							this
									.addHandler(
											b(document),
											e,
											function(k) {
												if (g.resizing) {
													return true
												}
												g.columnsbounds = new Array();
												var m = g.host.coord().left;
												var l = g.host.coord().top;
												if (g.showtoolbar) {
													l += g.toolbarheight
												}
												var j = 0;
												b
														.each(
																g.columns.records,
																function(o) {
																	var p = this;
																	if (p.hidden) {
																		g.columnsbounds[g.columnsbounds.length] = {
																			top : l,
																			column : p,
																			left : m,
																			width : 0,
																			height : 2 + g.rowsheight
																		};
																		return true
																	}
																	if (j == 0) {
																		if (!g.rtl) {
																			m = parseInt(g.host
																					.coord().left)
																					- g.hScrollInstance.value
																		} else {
																			m = parseInt(g.host
																					.coord().left)
																					- g.hScrollInstance.max
																					+ g.hScrollInstance.value
																		}
																	}
																	j++;
																	var n = 2 + g.columnsheight;
																	if (g.columnshierarchy) {
																		l = b(
																				p.uielement)
																				.coord().top;
																		n = b(
																				p.uielement)
																				.height()
																	}
																	g.columnsbounds[g.columnsbounds.length] = {
																		top : l,
																		column : p,
																		left : m,
																		width : p.width,
																		height : n
																	};
																	m += p.width
																})
											});
							this.removeHandler(b(document), i);
							this
									.addHandler(
											b(document),
											i,
											function(j) {
												if (g.resizing) {
													return true
												}
												g.__drag = false;
												b(document.body).removeClass(
														"jqx-disableselect");
												var l = parseInt(j.pageX);
												var t = parseInt(j.pageY);
												if (c) {
													var o = g.getTouches(j);
													var n = o[0];
													l = parseInt(n.pageX);
													t = parseInt(n.pageY)
												}
												var m = g.host.coord();
												var v = parseInt(m.left);
												var w = parseInt(m.top);
												if (g.showtoolbar) {
													w += g.toolbarheight
												}
												g.columndragstarted = false;
												g.dragmousedown = null;
												if (g.reordercolumn != null) {
													var k = b.data(
															g.reordercolumn[0],
															"reorderrecord");
													var x = g.columns.records
															.indexOf(g
																	.getcolumn(k));
													g.reordercolumn.remove();
													g.reordercolumn = null;
													var p = 0;
													p += g
															._pinnedColumnsLength();
													if (k != null) {
														if (d) {
															if (h != -1) {
																var q = h.index;
																if (q >= p) {
																	var s = g.columns.records[q];
																	if (s != undefined) {
																		var u = g.columns.records
																				.indexOf(g
																						.getcolumn(s.datafield));
																		if (s.datafield == null) {
																			var u = g.columns.records
																					.indexOf(g
																							.getcolumnbytext(s.text))
																		}
																		if (g.columngroups) {
																			var r = s;
																			if (x < u) {
																				if (h.position == "before") {
																					r = g.columns.records[u - 1]
																				}
																			}
																			if (r.columngroup != g
																					.getcolumn(k).columngroup) {
																				if (g.columnsdropline != null) {
																					g.columnsdropline
																							.remove();
																					g.columnsdropline = null
																				}
																				return
																			}
																		}
																		if (x < u) {
																			if (h.position == "before") {
																				g
																						.setcolumnindex(
																								k,
																								u - 1)
																			} else {
																				g
																						.setcolumnindex(
																								k,
																								u)
																			}
																		} else {
																			if (x > u) {
																				g
																						.setcolumnindex(
																								k,
																								u)
																			}
																		}
																	}
																}
															}
														}
														if (g.columnsdropline != null) {
															g.columnsdropline
																	.remove();
															g.columnsdropline = null
														}
													}
												}
											})
						},
						getcolumnbytext : function(d) {
							var c = null;
							if (this.columns.records) {
								b.each(this.columns.records, function() {
									if (this.text == d) {
										c = this;
										return false
									}
								})
							}
							return c
						},
						_handlereordercolumnsdroplines : function(i) {
							var c = this;
							var h = -1;
							var e = c._pinnedColumnsLength();
							var g = parseInt(c.host.coord().left);
							var d = g + c.host.width();
							var f = c.vScrollBar.css("visibility") != "hidden" ? 19
									: 0;
							if (!c.rtl) {
								f = 0
							}
							b.each(c.columnsbounds, function(j) {
								if (j >= e) {
									if (this.width == 0) {
										return true
									}
									if (i <= this.left + this.width / 2) {
										if (i > d) {
											c.columnsdropline.fadeOut();
											return false
										}
										c.columnsdropline.css("left", f
												+ parseInt(this.left) + "px");
										c.columnsdropline.css("top",
												parseInt(this.top) + "px");
										c.columnsdropline.height(this.height);
										c.columnsdropline.fadeIn("slow");
										h = {
											index : j,
											position : "before"
										};
										return false
									} else {
										if (i >= this.left + this.width / 2) {
											if (this.left + this.width > d) {
												c.columnsdropline.fadeOut();
												return false
											}
											c.columnsdropline.css("left", f + 1
													+ this.left + this.width);
											c.columnsdropline.css("top",
													this.top);
											c.columnsdropline
													.height(this.height);
											c.columnsdropline.fadeIn("slow");
											h = {
												index : j,
												position : "after"
											}
										}
									}
								}
							});
							return h
						},
						_createreordercolumn : function(d, f, i) {
							var h = this;
							var g = f;
							if (h.reordercolumn) {
								h.reordercolumn.remove()
							}
							if (h.columnsdropline) {
								h.columnsdropline.remove()
							}
							h.reordercolumn = b("<div></div>");
							var k = d.clone();
							h.reordercolumn.css("z-index", 999999);
							k.css("border-width", "1px");
							k.css("opacity", "0.4");
							var j = b(k
									.find("."
											+ h
													.toThemeProperty("jqx-grid-column-menubutton")));
							if (j.length > 0) {
								j.css("display", "none")
							}
							var c = b(k.find(".jqx-icon-close"));
							if (c.length > 0) {
								c.css("display", "none")
							}
							h.reordercolumnicon = b('<div style="z-index: 9999; position: absolute; left: 100%; top: 50%; margin-left: -18px; margin-top: -7px;"></div>');
							h.reordercolumnicon.addClass(h
									.toThemeProperty("jqx-grid-drag-icon"));
							h.reordercolumn.css("float", "left");
							h.reordercolumn.css("position", "absolute");
							var e = h.host.coord();
							k.width(d.width() + 16);
							h.reordercolumn.append(k);
							h.reordercolumn.height(d.height());
							h.reordercolumn.width(k.width());
							h.reordercolumn.append(h.reordercolumnicon);
							b(document.body).append(h.reordercolumn);
							k.css("margin-left", 0);
							k.css("left", 0);
							k.css("top", 0);
							h.reordercolumn.css("left", g.left
									+ h.dragmousedown.left);
							h.reordercolumn.css("top", g.top
									+ h.dragmousedown.top);
							if (i != undefined && i) {
								h.columnsdropline = b('<div style="z-index: 9999; display: none; position: absolute;"></div>');
								h.columnsdropline.width(2);
								h.columnsdropline
										.addClass(h
												.toThemeProperty("jqx-grid-group-drag-line"));
								b(document.body).append(h.columnsdropline)
							}
						},
						_handlecolumnsdragreorder : function(d, g) {
							if (this.reordercolumn) {
								this.reordercolumn.remove()
							}
							if (this.columnsdropline) {
								this.columnsdropline.remove()
							}
							this.dragmousedown = null;
							this.dragmousedownoffset = null;
							this.columndragstarted = false;
							this.reordercolumn = null;
							var h = this;
							var f;
							var c = false;
							if (this.isTouchDevice() && this.touchmode !== true) {
								c = true
							}
							var e = "mousedown.drag";
							var f = "mousemove.drag";
							if (c) {
								e = b.jqx.mobile
										.getTouchEventName("touchstart")
										+ ".drag";
								f = b.jqx.mobile.getTouchEventName("touchmove")
										+ ".drag"
							} else {
								this.addHandler(g, "dragstart", function(i) {
									return false
								})
							}
							this.addHandler(g, e, function(k) {
								if (false == d.draggable) {
									return true
								}
								if (h.resizing) {
									return true
								}
								h.__drag = true;
								var j = k.pageX;
								var i = k.pageY;
								if (c) {
									var l = h.getTouches(k);
									var n = l[0];
									j = n.pageX;
									i = n.pageY
								}
								h.dragmousedown = {
									left : j,
									top : i
								};
								var m = b(k.target).coord();
								h.dragmousedownoffset = {
									left : parseInt(j) - parseInt(m.left),
									top : parseInt(i - m.top)
								};
								if (k.preventDefault) {
									k.preventDefault()
								}
								return true
							});
							this.addHandler(g, f, function(k) {
								if (!d.draggable) {
									return true
								}
								if (undefined == d.datafield) {
									return true
								}
								if (d.pinned) {
									return true
								}
								if (h.resizing) {
									return true
								}
								if (h.dragmousedown) {
									var j = k.pageX;
									var i = k.pageY;
									if (c) {
										var m = h.getTouches(k);
										var o = m[0];
										if (o != undefined) {
											j = o.pageX;
											i = o.pageY
										}
									}
									f = {
										left : j,
										top : i
									};
									if (!h.columndragstarted
											&& h.reordercolumn == null) {
										var l = Math.abs(f.left
												- h.dragmousedown.left);
										var n = Math.abs(f.top
												- h.dragmousedown.top);
										if (l > 3 || n > 3) {
											h._createreordercolumn(g, f, true);
											b(document.body).addClass(
													"jqx-disableselect");
											b.data(h.reordercolumn[0],
													"reorderrecord",
													d.datafield)
										}
									}
								}
							})
						},
						_handlecolumnsresize : function() {
							var i = this;
							if (this.columnsresize) {
								var k = false;
								if (i.isTouchDevice()) {
									k = true
								}
								var g = "mousemove.resize" + this.element.id;
								var d = "mousedown.resize" + this.element.id;
								var e = "mouseup.resize" + this.element.id;
								if (k) {
									var g = b.jqx.mobile
											.getTouchEventName("touchmove")
											+ ".resize" + this.element.id;
									var d = b.jqx.mobile
											.getTouchEventName("touchstart")
											+ ".resize" + this.element.id;
									var e = b.jqx.mobile
											.getTouchEventName("touchend")
											+ ".resize" + this.element.id
								}
								this.removeHandler(b(document), g);
								this
										.addHandler(
												b(document),
												g,
												function(n) {
													if (i.resizablecolumn != null
															&& !i.disabled
															&& i.resizing) {
														if (i.resizeline != null) {
															var s = i.resizablecolumn.columnelement;
															var p = i.host
																	.coord();
															var v = parseInt(i.resizestartline
																	.coord().left);
															var l = v
																	- i._startcolumnwidth;
															var w = i.resizablecolumn.column.minwidth;
															if (w == "auto") {
																w = 0
															} else {
																w = parseInt(w)
															}
															var m = i.resizablecolumn.column.maxwidth;
															if (m == "auto") {
																m = 0
															} else {
																m = parseInt(m)
															}
															var q = n.pageX;
															if (k) {
																var t = b.jqx.mobile
																		.getTouches(n);
																var r = t[0];
																q = r.pageX
															}
															l += w;
															var u = m > 0 ? v
																	+ m : 0;
															var o = m == 0 ? true
																	: i._startcolumnwidth
																			+ q
																			- v < m ? true
																			: false;
															if (i.rtl) {
																var o = true
															}
															if (o) {
																if (!i.rtl) {
																	if (q >= p.left
																			&& q >= l) {
																		if (u != 0
																				&& n.pageX < u) {
																			i.resizeline
																					.css(
																							"left",
																							q)
																		} else {
																			if (u == 0) {
																				i.resizeline
																						.css(
																								"left",
																								q)
																			}
																		}
																		if (k) {
																			return false
																		}
																	}
																} else {
																	if (q >= p.left
																			&& q <= p.left
																					+ i.host
																							.width()) {
																		i.resizeline
																				.css(
																						"left",
																						q);
																		if (k) {
																			return false
																		}
																	}
																}
															}
														}
													}
													if (!k
															&& i.resizablecolumn != null) {
														return false
													}
												});
								this.removeHandler(b(document), d);
								this
										.addHandler(
												b(document),
												d,
												function(m) {
													if (i.resizablecolumn != null
															&& !i.disabled) {
														var l = i.resizablecolumn.columnelement;
														if (l.coord().top
																+ l.height()
																+ 5 < m.pageY) {
															i.resizablecolumn = null;
															return
														}
														if (l.coord().top - 5 > m.pageY) {
															i.resizablecolumn = null;
															return
														}
														i._startcolumnwidth = i.resizablecolumn.column.width;
														i.resizablecolumn.column._width = null;
														b(document.body)
																.addClass(
																		"jqx-disableselect");
														b(document.body)
																.addClass(
																		"jqx-position-reset");
														i._mouseDownResize = new Date();
														i.resizing = true;
														i._resizecolumn = i.resizablecolumn.column;
														i.resizeline = i.resizeline
																|| b('<div style="position: absolute;"></div>');
														i.resizestartline = i.resizestartline
																|| b('<div style="position: absolute;"></div>');
														i.resizebackground = i.resizebackground
																|| b('<div style="position: absolute; left: 0; top: 0; background: #000;"></div>');
														i.resizebackground
																.css("opacity",
																		0.01);
														i.resizebackground.css(
																"cursor",
																"col-resize");
														i.resizeline.css(
																"cursor",
																"col-resize");
														i.resizestartline.css(
																"cursor",
																"col-resize");
														i.resizeline
																.addClass(i
																		.toThemeProperty("jqx-grid-column-resizeline"));
														i.resizestartline
																.addClass(i
																		.toThemeProperty("jqx-grid-column-resizestartline"));
														b(document.body)
																.append(
																		i.resizeline);
														b(document.body)
																.append(
																		i.resizestartline);
														b(document.body)
																.append(
																		i.resizebackground);
														var n = i.resizablecolumn.columnelement
																.coord();
														i.resizebackground
																.css(
																		"left",
																		i.host
																				.coord().left);
														i.resizebackground
																.css(
																		"top",
																		i.host
																				.coord().top);
														i.resizebackground
																.width(i.host
																		.width());
														i.resizebackground
																.height(i.host
																		.height());
														i.resizebackground.css(
																"z-index",
																999999999);
														var o = function(q) {
															if (!i.rtl) {
																q
																		.css(
																				"left",
																				parseInt(n.left)
																						+ i._startcolumnwidth)
															} else {
																q
																		.css(
																				"left",
																				parseInt(n.left))
															}
															var t = 0;
															var v = i.showtoolbar ? i.toolbarheight
																	: 0;
															t += v;
															var p = i.showstatusbar ? i.statusbarheight
																	: 0;
															t += p;
															var s = i.showaggregates ? i.aggregatesheight
																	: 0;
															t += s;
															if (i.pageable
																	&& i.pagerposition != "bottom") {
																t += i.pagerheight
															}
															var r = 0;
															if (i.pageable
																	&& i.pagerposition != "top") {
																r = i.pagerheight
															}
															var u = i.hScrollBar
																	.css("visibility") == "visible" ? i.scrollbarsize
																	: 0;
															q
																	.css(
																			"top",
																			parseInt(n.top));
															q.css("z-index",
																	9999999999);
															if (i.columngroups) {
																q
																		.height(i.host
																				.height()
																				+ i.resizablecolumn.columnelement
																						.height()
																				- r
																				- t
																				- u
																				- i.columngroupslevel
																				* i.columnsheight)
															} else {
																q
																		.height(i.host
																				.height()
																				- r
																				- t
																				- u)
															}
															q.show("fast")
														};
														o(i.resizeline);
														o(i.resizestartline);
														i.dragmousedown = null
													}
												});
								var f = function() {
									b(document.body).removeClass(
											"jqx-disableselect");
									b(document.body).removeClass(
											"jqx-position-reset");
									if (!i.resizing) {
										return
									}
									i._mouseUpResize = new Date();
									var t = i._mouseUpResize
											- i._mouseDownResize;
									if (t < 200) {
										i.resizing = false;
										if (i._resizecolumn != null
												&& i.resizeline != null
												&& i.resizeline.css("display") == "block") {
											i._resizecolumn = null;
											i.resizeline.hide();
											i.resizestartline.hide();
											i.resizebackground.remove()
										}
										return
									}
									i.resizing = false;
									if (i.disabled) {
										return
									}
									var n = i.host.width();
									if (i.vScrollBar[0].style.visibility != "hidden") {
										n -= 20
									}
									if (n < 0) {
										n = 0
									}
									if (i._resizecolumn != null
											&& i.resizeline != null
											&& i.resizeline.css("display") == "block") {
										var u = parseInt(i.resizeline
												.css("left"));
										var o = parseInt(i.resizestartline
												.css("left"));
										var s = i._startcolumnwidth + u - o;
										if (i.rtl) {
											var s = i._startcolumnwidth - u + o
										}
										var r = i._resizecolumn.width;
										i._resizecolumn.width = s;
										if (i._resizecolumn._percentagewidth != undefined) {
											i._resizecolumn._percentagewidth = (s / n) * 100
										}
										for (var q = 0; q < i._columns.length; q++) {
											if (i._columns[q].datafield === i._resizecolumn.datafield) {
												i._columns[q].width = i._resizecolumn.width;
												break
											}
										}
										var l = i.hScrollBar[0].style.visibility;
										var p = i._resizecolumn.displayfield;
										i._updatecolumnwidths();
										i.refresh();
										i._resizecolumn = null;
										i.resizeline.hide();
										i.resizestartline.hide();
										i.resizebackground.remove();
										i.resizablecolumn = null;
										i._raiseEvent("columnResized", {
											dataField : p,
											oldWidth : r,
											newWidth : s
										})
									} else {
										i.resizablecolumn = null
									}
								};
								try {
									if (document.referrer != ""
											|| window.frameElement) {
										var c = null;
										if (window.top != null
												&& window.top != window.that) {
											if (window.parent
													&& document.referrer) {
												c = document.referrer
											}
										}
										if (c
												&& c
														.indexOf(document.location.host) != -1) {
											var h = function(l) {
												f()
											};
											if (window.top.document.addEventListener) {
												window.top.document
														.addEventListener(
																"mouseup", h,
																false)
											} else {
												if (window.top.document.attachEvent) {
													window.top.document
															.attachEvent(
																	"onmouseup",
																	h)
												}
											}
										}
									}
								} catch (j) {
								}
								this.removeHandler(b(document), e);
								this.addHandler(b(document), e, function(m) {
									var l = b.data(document.body, "contextmenu"
											+ i.element.id);
									if (l != null
											&& i.autoshowcolumnsmenubutton) {
										return true
									}
									f()
								})
							}
						},
						_updatecolumnwidths : function() {
							var k = this.host.width();
							var c = k;
							if (this.vScrollBar.css("visibility") === "visible") {
								k -= parseInt(this.scrollbarsize) + 6;
								c = k
							}
							var j = "";
							if (this.columns == undefined
									|| this.columns.records == undefined) {
								return
							}
							var i = this;
							var h = false;
							b
									.each(
											this.columns.records,
											function(l, m) {
												if (!(this.hidden)) {
													if (this.width.toString()
															.indexOf("%") != -1
															|| this._percentagewidth != undefined) {
														var m = 0;
														var n = i.vScrollBar[0].style.visibility == "hidden" ? 0
																: i.scrollbarsize + 5;
														m = parseFloat(this.width)
																* c / 100;
														if (this._percentagewidth != undefined) {
															m = parseFloat(this._percentagewidth)
																	* (c) / 100
														}
														if (m < this.minwidth
																&& this.minwidth != "auto") {
															m = this.minwidth
														}
														if (m > this.maxwidth
																&& this.maxwidth != "auto") {
															m = this.maxwidth
														}
														k -= Math.round(m)
													} else {
														if (this.width != "auto"
																&& !this._width) {
															k -= this.width
														} else {
															j += this.text
														}
													}
												}
											});
							var f = this.columnsheader.find("#columntable"
									+ this.element.id);
							if (f.length == 0) {
								return
							}
							var d = 0;
							var g = f.find(".jqx-grid-column-header");
							var e = 0;
							b
									.each(
											this.columns.records,
											function(m, r) {
												var o = b(g[m]);
												var l = false;
												var q = this.width;
												var p = this.width;
												if (this.width.toString()
														.indexOf("%") != -1
														|| this._percentagewidth != undefined) {
													if (this._percentagewidth != undefined) {
														q = parseFloat(this._percentagewidth)
																* c / 100
													} else {
														q = parseFloat(this.width)
																* c / 100
													}
													q = Math.round(q);
													l = true
												}
												if (this.width != "auto"
														&& !this._width && !l) {
													if (parseInt(o[0].style.width) != this.width) {
														o.width(this.width)
													}
												} else {
													if (l) {
														if (q < this.minwidth
																&& this.minwidth != "auto") {
															q = this.minwidth;
															this.width = q
														}
														if (q > this.maxwidth
																&& this.maxwidth != "auto") {
															q = this.maxwidth;
															this.width = q
														}
														if (parseInt(o[0].style.width) != q) {
															o.width(q);
															this.width = q
														}
													} else {
														var n = Math
																.floor(k
																		* (this.text.length / j.length));
														if (isNaN(n)) {
															n = this.minwidth
														}
														var s = (k * (this.text.length / j.length))
																- n;
														d += s;
														if (d >= 1) {
															d -= 1;
															n++
														}
														if (d >= 0.5
																&& m == i.columns.records.length - 1) {
															n++
														}
														if (n < 0) {
															$element = b("<span>"
																	+ this.text
																	+ "</span>");
															b(document.body)
																	.append(
																			$element);
															n = 10 + $element
																	.width();
															$element.remove()
														}
														if (n < this.minwidth) {
															n = this.minwidth
														}
														if (n > this.maxwidth) {
															n = this.maxwidth
														}
														this._width = "auto";
														this.width = n;
														o.width(this.width)
													}
												}
												if (parseInt(o[0].style.left) != e) {
													o.css("left", e)
												}
												if (!(this.hidden)) {
													e += this.width
												}
												this._requirewidthupdate = true;
												if (p !== this.width) {
													h = true
												}
											});
							this.columnsheader.width(2 + e);
							f.width(this.columnsheader.width());
							this._resizecolumngroups();
							if (h) {
								this._renderrows()
							}
							if (this.showaggregates) {
								this._refreshcolumnsaggregates()
							}
						},
						_rendercolumnheaders : function() {
							var r = this;
							if (this._updating) {
								return
							}
							this._columnsbydatafield = new Array();
							this.columnsheader.find(
									"#columntable" + this.element.id).remove();
							var g = b('<div id="columntable'
									+ this.element.id
									+ '" style="height: 100%; position: relative;"></div>');
							g[0].cells = new Array();
							var l = 0;
							var h = 0;
							var s = "";
							var u = this.host.width();
							var f = u;
							var w = new Array();
							var t = new Array();
							b
									.each(
											this.columns.records,
											function(j, k) {
												if (!(this.hidden)) {
													if (this.width != "auto"
															&& !this._width) {
														if (this.width < this.minwidth
																&& this.minwidth != "auto") {
															u -= this.minwidth
														} else {
															if (this.width > this.maxwidth
																	&& this.maxwidth != "auto") {
																u -= this.maxwidth
															} else {
																if (this.width
																		.toString()
																		.indexOf(
																				"%") != -1) {
																	var k = 0;
																	k = parseFloat(this.width)
																			* f
																			/ 100;
																	if (k < this.minwidth
																			&& this.minwidth != "auto") {
																		k = this.minwidth
																	}
																	if (k > this.maxwidth
																			&& this.maxwidth != "auto") {
																		k = this.maxwidth
																	}
																	u -= k
																} else {
																	if (typeof this.width == "string") {
																		this.width = parseInt(this.width)
																	}
																	u -= this.width
																}
															}
														}
													} else {
														s += this.text
													}
												}
												if (this.pinned || this.grouped
														|| this.checkboxcolumn) {
													if (r._haspinned) {
														this.pinned = true
													}
													w[w.length] = this
												} else {
													t[t.length] = this
												}
											});
							if (!this.rtl) {
								for (var o = 0; o < w.length; o++) {
									this.columns.replace(o, w[o])
								}
								for (var m = 0; m < t.length; m++) {
									this.columns.replace(w.length + m, t[m])
								}
							} else {
								var e = 0;
								w.reverse();
								for (var o = this.columns.records.length - 1; o >= this.columns.records.length
										- w.length; o--) {
									this.columns.replace(o, w[e++])
								}
								for (var m = 0; m < t.length; m++) {
									this.columns.replace(m, t[m])
								}
							}
							var v = this.headerZIndex;
							var d = 0;
							var n = r.columnsheight;
							var q = function(j, k) {
								var i = r.columngroupslevel * r.columnsheight;
								i = i - (k.level * r.columnsheight);
								return i
							};
							var c = 0;
							b
									.each(
											this.columns.records,
											function(J, H) {
												this.height = r.columnsheight;
												if (r.columngroups) {
													if (r.columngroups.length) {
														this.height = q(
																this.datafield,
																this);
														n = this.height
													}
												}
												var M = r
														.toTP("jqx-grid-column-header")
														+ " "
														+ r
																.toTP("jqx-widget-header");
												if (r.rtl) {
													M += " "
															+ r
																	.toTP("jqx-grid-column-header-rtl")
												}
												if (!r.enablebrowserselection) {
													M += " "
															+ r
																	.toTP("jqx-disableselect")
												}
												var K = !self.rtl ? 150 + v - 1
														: 150 + v + 1;
												var F = !r.rtl ? v-- : v++;
												var x = b('<div role="columnheader" style="z-index: '
														+ F
														+ ';position: absolute; height: 100%;" class="'
														+ M
														+ '"><div style="height: 100%; width: 100%;"></div></div>');
												if (r.rtl && J === 0) {
													x[0].style.borderLeftColor = "transparent"
												}
												if (r.columngroups) {
													x[0].style.height = n
															+ "px";
													x[0].style.bottom = "0px";
													if (this.pinned) {
														x[0].style.zIndex = K
													}
												}
												this.uielement = x;
												this.element = x;
												if (this.classname != ""
														&& this.classname) {
													x.addClass(this.classname)
												}
												var C = this.width;
												var D = false;
												if (this.width === null) {
													this.width = "auto"
												}
												if (this.width.toString()
														.indexOf("%") != -1
														|| this._percentagewidth != undefined) {
													if (this._percentagewidth != undefined) {
														C = parseFloat(this._percentagewidth)
																* f / 100
													} else {
														C = parseFloat(this.width)
																* f / 100
													}
													C = Math.round(C);
													D = true
												}
												if (this.width != "auto"
														&& !this._width && !D) {
													if (C < this.minwidth
															&& this.minwidth != "auto") {
														C = this.minwidth
													}
													if (C > this.maxwidth
															&& this.maxwidth != "auto") {
														C = this.maxwidth
													}
													x[0].style.width = parseInt(C)
															+ "px"
												} else {
													if (D) {
														if (C < this.minwidth
																&& this.minwidth != "auto") {
															C = this.minwidth
														}
														if (C > this.maxwidth
																&& this.maxwidth != "auto") {
															C = this.maxwidth
														}
														if (this._percentagewidth == undefined
																|| this.width
																		.toString()
																		.indexOf(
																				"%") != -1) {
															this._percentagewidth = this.width
														}
														x.width(C);
														this.width = C
													} else {
														var G = Math
																.floor(u
																		* (this.text.length / s.length));
														var E = (u * (this.text.length / s.length))
																- G;
														c += E;
														if (c >= 1) {
															c -= 1;
															G++
														}
														if (c >= 0.5
																&& J == r.columns.records.length - 1) {
															G++
														}
														if (isNaN(G)) {
															G = this.minwidth
														}
														if (G < 0) {
															$element = b("<span>"
																	+ this.text
																	+ "</span>");
															b(document.body)
																	.append(
																			$element);
															G = 10 + $element
																	.width();
															$element.remove()
														}
														if (G < this.minwidth) {
															G = this.minwidth
														}
														if (G > this.maxwidth) {
															G = this.maxwidth
														}
														this._width = "auto";
														this.width = parseInt(G);
														C = this.width;
														x.width(this.width)
													}
												}
												if (this.hidden) {
													x.css("display", "none")
												}
												var k = b(x.children()[0]);
												g[0].cells[J] = x[0];
												var p = false;
												var I = false;
												var z = this.renderer != null ? this
														.renderer(this.text,
																this.align, n)
														: r
																._rendercolumnheader(
																		this.text,
																		this.align,
																		n, r);
												if (z == null) {
													z = r._rendercolumnheader(
															this.text,
															this.align, n, r)
												}
												if (this.renderer != null) {
													z = b(z)
												}
												p = true;
												if (r.WinJS) {
													MSApp
															.execUnsafeLocalFunction(function() {
																k.append(b(z))
															})
												} else {
													if (this.renderer) {
														k.append(b(z))
													} else {
														if (z) {
															k[0].innerHTML = z
														}
													}
												}
												if (z != null) {
													var B = b('<div class="iconscontainer" style="height: '
															+ n
															+ 'px; margin-left: -32px; display: block; position: absolute; left: 100%; top: 0%; width: 32px;"><div class="filtericon '
															+ r
																	.toTP("jqx-widget-header")
															+ '" style="height: '
															+ n
															+ 'px; float: right; display: none; width: 16px;"><div class="'
															+ r
																	.toTP("jqx-grid-column-filterbutton")
															+ '" style="width: 100%; height:100%;"></div></div><div class="sortasc '
															+ r
																	.toTP("jqx-widget-header")
															+ '" style="height: '
															+ n
															+ 'px; float: right; display: none; width: 16px;"><div class="'
															+ r
																	.toTP("jqx-grid-column-sortascbutton")
															+ '" style="width: 100%; height:100%;"></div></div><div class="sortdesc '
															+ r
																	.toTP("jqx-widget-header")
															+ '" style="height: '
															+ n
															+ 'px; float: right; display: none; width: 16px;"><div class="'
															+ r
																	.toTP("jqx-grid-column-sortdescbutton")
															+ '" style="width: 100%; height:100%;"></div></div></div>');
													k.append(B);
													var N = B.children();
													this.sortasc = N[1];
													this.sortdesc = N[2];
													this.filtericon = N[0];
													this.iconscontainer = B;
													if (r.rtl) {
														B.css("margin-left",
																"0px");
														B.css("left", "0px");
														b(this.sortasc)
																.css("float",
																		"left");
														b(this.filtericon)
																.css("float",
																		"left");
														b(this.sortdesc)
																.css("float",
																		"left")
													}
												}
												g.append(x);
												if (r.columnsreorder
														&& this.draggable
														&& r._handlecolumnsdragreorder) {
													r
															._handlecolumnsdragreorder(
																	this, x)
												}
												var L = this;
												r
														.addHandler(
																x,
																"click",
																function(i) {
																	if (L.checkboxcolumn) {
																		return true
																	}
																	if (r._togglesort) {
																		if (!r._loading) {
																			r
																					._togglesort(L)
																		}
																	}
																	i
																			.preventDefault()
																});
												if (L.resizable
														&& r.columnsresize
														&& !I) {
													var y = false;
													var j = "mousemove";
													if (r.isTouchDevice()) {
														y = true;
														j = b.jqx.mobile
																.getTouchEventName("touchstart")
													}
													r
															.addHandler(
																	x,
																	j,
																	function(O) {
																		var i = parseInt(O.pageX);
																		var Q = 5;
																		var T = parseInt(x
																				.coord().left);
																		if (r.hasTransform) {
																			T = b.jqx.utilities
																					.getOffset(x).left
																		}
																		if (r._handlecolumnsresize) {
																			if (y) {
																				var P = b.jqx.mobile
																						.getTouches(O);
																				var S = P[0];
																				i = S.pageX;
																				Q = 40;
																				if (i >= T
																						+ L.width
																						- Q) {
																					r.resizablecolumn = {
																						columnelement : x,
																						column : L
																					};
																					x
																							.css(
																									"cursor",
																									"col-resize")
																				} else {
																					x
																							.css(
																									"cursor",
																									"");
																					r.resizablecolumn = null
																				}
																				return true
																			}
																			var R = L.width;
																			if (r.rtl) {
																				R = 0
																			}
																			if (i >= T
																					+ R
																					- Q) {
																				if (i <= T
																						+ R
																						+ Q) {
																					r.resizablecolumn = {
																						columnelement : x,
																						column : L
																					};
																					x
																							.css(
																									"cursor",
																									"col-resize");
																					return false
																				} else {
																					x
																							.css(
																									"cursor",
																									"");
																					r.resizablecolumn = null
																				}
																			} else {
																				x
																						.css(
																								"cursor",
																								"");
																				if (i < T
																						+ R
																						- Q) {
																					if (!L._animating
																							&& !L._menuvisible) {
																						x
																								.mouseenter()
																					}
																				}
																				r.resizablecolumn = null
																			}
																		}
																	})
												}
												x.css("left", h);
												if (!(this.hidden)) {
													h += C
												}
												if (L.rendered) {
													var A = L.rendered(
															b(k[0].firstChild),
															L.align, n);
													if (A && B != null) {
														B.hide()
													}
												}
											});
							if (h > 0) {
								this.columnsheader.width(2 + h)
							} else {
								this.columnsheader.width(h)
							}
							this.columnsrow = g;
							r.columnsheader.append(g);
							g.width(h);
							if (this._handlecolumnsdragdrop) {
								this._handlecolumnsdragdrop()
							}
							if (this._handlecolumnsreorder) {
								this._handlecolumnsreorder()
							}
							if (this._handlecolumnsresize) {
								this._handlecolumnsresize()
							}
							if (this.columngroups) {
								this._rendercolumngroups()
							}
						},
						_rendercolumngroups : function() {
							if (!this.columngroups) {
								return
							}
							var o = 0;
							for (var l = 0; l < this.columns.records.length; l++) {
								if (this.columns.records[l].pinned) {
									o++
								}
							}
							var t = this.headerZIndex - o
									+ this.columns.records.length;
							var n = this;
							var g = n.toTP("jqx-grid-column-header") + " "
									+ n.toTP("jqx-grid-columngroup-header")
									+ " " + n.toTP("jqx-widget-header");
							if (n.rtl) {
								g += " "
										+ n
												.toTP("jqx-grid-columngroup-header-rtl")
							}
							var e = this.columnsheader.find("#columntable"
									+ this.element.id);
							e.find("jqx-grid-columngroup-header").remove();
							for (var h = 0; h < this.columngroupslevel - 1; h++) {
								for (var l = 0; l < this.columngroups.length; l++) {
									var q = this.columngroups[l];
									var c = q.level;
									if (c !== h) {
										continue
									}
									var p = c * this.columnsheight;
									var d = 99999;
									if (q.groups) {
										var s = function(w) {
											var v = 0;
											for (var u = 0; u < w.groups.length; u++) {
												var i = w.groups[u];
												if (!i.groups) {
													if (!i.hidden) {
														v += i.width;
														d = Math
																.min(
																		parseInt(i.element[0].style.left),
																		d)
													}
												} else {
													v += s(i)
												}
											}
											return v
										};
										q.width = s(q);
										q.left = d;
										var r = this.columnsheight;
										var m = t--;
										var f = b('<div role="columnheader" style="z-index: '
												+ m
												+ ';position: absolute;" class="'
												+ g + '"></div>');
										var k = b(this._rendercolumnheader(
												q.text, q.align,
												this.columnsheight, this));
										f.append(k);
										f[0].style.left = d + "px";
										if (d === 0) {
											f[0].style.borderLeftColor = "transparent"
										}
										f[0].style.top = p + "px";
										f[0].style.height = r + "px";
										f[0].style.width = -1 + q.width + "px";
										e.append(f);
										q.element = f
									}
								}
							}
						},
						_resizecolumngroups : function() {
							if (!this.columngroups) {
								return
							}
							for (var d = 0; d < this.columngroups.length; d++) {
								var j = this.columngroups[d];
								var k = j.level;
								var h = k * this.columnsheight;
								var g = 99999;
								if (j.groups) {
									var f = function(n) {
										var m = 0;
										for (var l = 0; l < n.groups.length; l++) {
											var i = n.groups[l];
											if (!i.groups) {
												m += i.width;
												g = Math
														.min(
																parseInt(i.element[0].style.left),
																g)
											} else {
												m += f(i)
											}
										}
										return m
									};
									j.width = f(j);
									j.left = g;
									var c = this.columnsheight;
									var e = j.element;
									e[0].style.left = g + "px";
									e[0].style.top = h + "px";
									e[0].style.height = c + "px";
									e[0].style.width = -1 + j.width + "px"
								}
							}
						},
						_removecolumnhandlers : function(f) {
							var d = this;
							var c = b(f.element);
							if (c.length > 0) {
								d.removeHandler(c, "mouseenter");
								d.removeHandler(c, "mouseleave");
								var e = b(f.filtericon);
								d.removeHandler(e, "mousedown");
								d.removeHandler(e, "click");
								d.removeHandler(c, "click")
							}
						},
						_calculateaggregate : function(k, o, d, h) {
							var e = k.aggregates;
							if (!e) {
								e = o
							}
							if (e) {
								var f = new Array();
								for (var n = 0; n < e.length; n++) {
									if (e[n] == "count") {
										continue
									}
									f[f.length] = k.cellsformat
								}
								if (this.source
										&& this.source.getAggregatedData) {
									if (h == undefined) {
										h = this.getRows();
										if (this.dataViewRecords) {
											h = this.dataViewRecords
										}
									}
									var s = h;
									var c = -1;
									if (this.treeGrid) {
										var q = new Array();
										var r = function(u) {
											for (var t = 0; t < u.length; t++) {
												if (u[t] == undefined) {
													continue
												}
												if (c == -1) {
													c = u[t].level
												}
												if (!u[t].aggregate) {
													q.push(u[t])
												}
												if (!u[t].leaf
														&& u[t].records
														&& u[t].records.length > 0) {
													r(u[t].records)
												}
											}
										};
										r(h);
										h = q
									}
									if (this.treeGrid && this.filterable
											&& this.dataview.filters.length > 0) {
										var p = new Array();
										for (var n = 0; n < h.length; n++) {
											if (h[n] && h[n]._visible !== false) {
												p.push(h[n])
											}
										}
										h = p;
										var l = new Array();
										for (var n = 0; n < s.length; n++) {
											if (s[n] && s[n]._visible !== false) {
												l.push(s[n])
											}
										}
										s = l
									}
									if (d == undefined || d == true) {
										var m = this.source.getAggregatedData(
												[ {
													name : k.datafield,
													aggregates : e,
													formatStrings : f
												} ], this.gridlocalization, h,
												c);
										if (this.treeGrid) {
											var g = this.source._source.hierarchy
													&& this.source._source.hierarchy.groupingDataFields ? this.source._source.hierarchy.groupingDataFields.length
													: 0;
											if (g == 0 || c >= g) {
												if (m[k.datafield].sum != undefined
														|| m[k.datafield].avg != undefined) {
													var j = this.source
															.getAggregatedData(
																	[ {
																		name : k.datafield,
																		aggregates : e,
																		formatStrings : f
																	} ],
																	this.gridlocalization,
																	s, c);
													if (m[k.datafield].sum != undefined) {
														m[k.datafield].sum = j[k.datafield].sum
													}
													if (m[k.datafield].avg != undefined) {
														m[k.datafield].avg = j[k.datafield].avg
													}
												}
											}
										}
										return m
									} else {
										var m = this.source.getAggregatedData(
												[ {
													name : k.datafield,
													aggregates : e
												} ], this.gridlocalization, h,
												c);
										if (this.treeGrid) {
											if (m[k.datafield].sum != undefined
													|| m[k.datafield].avg != undefined) {
												var g = this.source._source.hierarchy
														&& this.source._source.hierarchy.groupingDataFields ? this.source._source.hierarchy.groupingDataFields.length
														: 0;
												if (g == 0 || c >= g) {
													var j = this.source
															.getAggregatedData(
																	[ {
																		name : k.datafield,
																		aggregates : e
																	} ],
																	this.gridlocalization,
																	s, c);
													if (m[k.datafield].sum != undefined) {
														m[k.datafield].sum = j[k.datafield].sum
													}
													if (m[k.datafield].avg != undefined) {
														m[k.datafield].avg = j[k.datafield].avg
													}
												}
											}
										}
										return m
									}
								}
							}
							return null
						},
						getcolumnaggregateddata : function(d, h, i, e) {
							var f = this.getcolumn(d);
							if (!f) {
								return ""
							}
							var k = (i == undefined || i == false) ? false : i;
							if (h == null) {
								return ""
							}
							var c = f.aggregates;
							f.aggregates = null;
							var j = this._calculateaggregate(f, h, k, e);
							var g = {};
							if (j) {
								g = j[d];
								f.aggregates = c
							}
							return g
						},
						_updatecolumnaggregates : function(e, h, c) {
							var f = this;
							if (!h) {
								c.children().remove();
								c.html("");
								if (e.aggregatesrenderer) {
									var g = {};
									if (e.aggregates) {
										g = this.getcolumnaggregateddata(
												e.datafield, e.aggregates)
									}
									var d = e
											.aggregatesrenderer({}, e, c, null);
									c.html(d)
								}
								return
							}
							c.children().remove();
							c.html("");
							if (e.aggregatesrenderer) {
								if (h) {
									var d = e.aggregatesrenderer(
											h[e.datafield], e, c, this
													.getcolumnaggregateddata(
															e.datafield,
															e.aggregates),
											"aggregates");
									c.html(d)
								}
							} else {
								b
										.each(
												h,
												function() {
													var j = this;
													for (g in j) {
														var k = b('<div style="position: relative; margin: 4px; overflow: hidden;"></div>');
														var i = g;
														i = f
																._getaggregatename(i);
														k.html(i + ":" + j[g]);
														if (f.rtl) {
															k
																	.addClass(f
																			.toThemeProperty("jqx-rtl"))
														}
														c.append(k)
													}
												})
							}
						},
						_getaggregatetype : function(d) {
							switch (d) {
							case "min":
							case "max":
							case "count":
							case "avg":
							case "product":
							case "var":
							case "varp":
							case "stdev":
							case "stdevp":
							case "sum":
								return d
							}
							var c = d;
							for ( var e in d) {
								c = e;
								break
							}
							return c
						},
						_getaggregatename : function(d) {
							var c = d;
							switch (d) {
							case "min":
								c = "Min";
								break;
							case "max":
								c = "Max";
								break;
							case "count":
								c = "Count";
								break;
							case "avg":
								c = "Avg";
								break;
							case "product":
								c = "Product";
								break;
							case "var":
								c = "Var";
								break;
							case "stdevp":
								c = "StDevP";
								break;
							case "stdev":
								c = "StDev";
								break;
							case "varp":
								c = "VarP";
							case "sum":
								c = "Sum";
								break
							}
							if (d === c && typeof (c) != "string") {
								for ( var e in d) {
									c = e;
									break
								}
							}
							return c
						},
						_updatecolumnsaggregates : function() {
							var g = this.getRows();
							if (this.dataViewRecords) {
								g = this.dataViewRecords
							}
							var c = this.columns.records.length;
							if (undefined != this.aggregates[0].cells) {
								for (var f = 0; f < c; f++) {
									var h = b(this.aggregates[0].cells[f]);
									var e = this.columns.records[f];
									var d = this._calculateaggregate(e, null,
											true, g);
									this._updatecolumnaggregates(e, d, h)
								}
							}
						},
						_refreshcolumnsaggregates : function() {
							var c = this.columns.records.length;
							if (undefined != this.aggregates[0].cells) {
								var f = 0;
								for (var e = 0; e < c; e++) {
									var g = b(this.aggregates[0].cells[e]);
									var d = this.columns.records[e];
									if (g) {
										g.width(d.width);
										g[0].style.left = f + "px";
										if (!(d.hidden && d.hideable)) {
											f += d.width
										} else {
											g.css("display", "none")
										}
									}
								}
							}
						},
						_updateaggregates : function() {
							var c = b('<div style="position: relative;" id="statusrow'
									+ this.element.id + '"></div>');
							var f = 0;
							var m = this.columns.records.length;
							var l = this.toThemeProperty("jqx-grid-cell");
							if (this.rtl) {
								l += " "
										+ this
												.toThemeProperty("jqx-grid-cell-rtl");
								f = 0;
								c.css("border-left-width", "0px");
								this.aggregates.css("border-left-color",
										"transparent")
							}
							l += " "
									+ this
											.toThemeProperty("jqx-grid-cell-pinned");
							var n = m + 10;
							var o = new Array();
							this.aggregates[0].cells = o;
							for (var h = 0; h < m; h++) {
								var g = this.columns.records[h];
								var i = this._calculateaggregate(g);
								var d = g.width;
								if (d < g.minwidth) {
									d = g.minwidth
								}
								if (d > g.maxwidth) {
									d = g.maxwidth
								}
								var e = l;
								if (g.cellsalign) {
									e += " "
											+ this.toThemeProperty("jqx-"
													+ g.cellsalign + "-align")
								}
								var k = b('<div style="overflow: hidden; position: absolute; height: 100%;" class="'
										+ e + '"></div>');
								c.append(k);
								k.css("left", f);
								if (!this.rtl) {
									k.css("z-index", n--)
								} else {
									k.css("z-index", n++);
									if (h == 0) {
										k.css("border-left-width", "0px")
									}
								}
								k.width(d);
								k[0].style.left = f + "px";
								if (!(g.hidden && g.hideable)) {
									f += d
								} else {
									k.css("display", "none")
								}
								o[o.length] = k[0];
								this._updatecolumnaggregates(g, i, k)
							}
							if (b.jqx.browser.msie && b.jqx.browser.version < 8) {
								c.css("z-index", n--)
							}
							c.width(parseInt(f) + 2);
							c.height(this.aggregatesheight);
							this.aggregates.children().remove();
							this.aggregates.append(c);
							this.aggregates.removeClass(this
									.toThemeProperty("jqx-widget-header"));
							this.aggregates.addClass(l);
							this.aggregates.css("border-bottom-color",
									"transparent");
							this.aggregates.css("border-top-width", "1px");
							if (this.rtl
									&& this.hScrollBar.css("visibility") != "hidden") {
								this._renderhorizontalscroll()
							}
						},
						destroy : function() {
							if (this.columns && this.columns.records) {
								for (var d = 0; d < this.columns.records.length; d++) {
									this
											._removecolumnhandlers(this.columns.records[d])
								}
							}
							this.removeHandler(b(document),
									"mouseup.pagerbuttonstop");
							this.removeHandler(b(document),
									"mouseup.pagerbuttonsbottom");
							if (this.filterable) {
								if (this.filterrow) {
									for (var d = 0; d < this.filterrow[0].cells.length; d++) {
										var c = this.filterrow[0].cells[d];
										var f = b(c).find(".filterconditions");
										var e = this.columns.records[d];
										if (f.length > 0) {
											f.jqxDropDownList("destroy")
										}
									}
								}
								if (this.filtercolumnsList) {
									this.filtercolumnsList
											.jqxDropDownList("destroy")
								}
							}
							if (this.pageable) {
								if (this["pagershowrowscombotop"]) {
									this["pagershowrowscombotop"]
											.jqxDropDownList("destroy")
								}
								if (this["pagershowrowscombobottom"]) {
									this["pagershowrowscombobottom"]
											.jqxDropDownList("destroy")
								}
							}
							this._removeHandlers();
							b.jqx.utilities.resize(this.host, null, true);
							this.host.remove()
						},
						propertyChangedHandler : function(e, l, d, k) {
							if (this.isInitialized == undefined
									|| this.isInitialized == false) {
								return
							}
							l = l.toLowerCase();
							if (k !== d) {
								if (l === "height") {
									e.host.height(e.height);
									e.host.width(e.width);
									e._updatesize(false, true)
								} else {
									if (l === "width") {
										e.host.height(e.height);
										e.host.width(e.width);
										e._updatesize(true, false)
									} else {
										if (l === "source") {
											e.updatebounddata()
										} else {
											if (l === "columns"
													|| l === "columngroups") {
												e._columns = null;
												e._render()
											} else {
												if (l === "pagermode") {
													e.pagermode = k
															.toLowerCase();
													e._initpager()
												} else {
													if (l == "pagesizeoptions") {
														e._initpager();
														var j = false;
														for (var f = 0; f < k.length; f++) {
															if (parseInt(k[f]) == e.pagesize) {
																j = true;
																break
															}
														}
														if (!j) {
															b.jqx.set(e, [ {
																pagesize : k[0]
															} ])
														}
													} else {
														if (l == "pagesize") {
															var g = e.dataview.pagenum
																	* e.dataview.pagesize;
															e.dataview.pagesize = e.pagesize;
															var h = Math
																	.floor(g
																			/ e.dataview.pagesize);
															if (h !== e.dataview.pagenum
																	|| parseInt(k) !== parseInt(d)) {
																e
																		._raiseEvent(
																				"pageSizeChanged",
																				{
																					pagenum : k,
																					oldpagesize : d,
																					pagesize : e.dataview.pagesize
																				});
																var m = e
																		.gotopage(h);
																if (!m) {
																	if (!e.serverProcessing) {
																		e
																				.refresh()
																	} else {
																		e
																				.updatebounddata("pager")
																	}
																}
															}
														} else {
															if (l === "pagerposition") {
																e.refresh()
															} else {
																if (l === "selectionmode") {
																	e.selectionmode = k
																			.toLowerCase()
																} else {
																	if (l == "touchmode") {
																		e
																				._removeHandlers();
																		e.touchDevice = null;
																		e.vScrollBar
																				.jqxScrollBar({
																					touchMode : k
																				});
																		e.hScrollBar
																				.jqxScrollBar({
																					touchMode : k
																				});
																		e
																				.refresh();
																		e
																				._addHandlers()
																	} else {
																		if (l == "enablehover") {
																			return
																		} else {
																			if (l == "disabled") {
																				if (k) {
																					e.host
																							.addClass(this
																									.toThemeProperty("jqx-fill-state-disabled"))
																				} else {
																					e.host
																							.removeClass(this
																									.toThemeProperty("jqx-fill-state-disabled"))
																				}
																				if (e.pageable) {
																					if (e.pagernexttop) {
																						e.pagernexttop
																								.jqxButton({
																									disabled : k
																								});
																						e.pagerprevioustop
																								.jqxButton({
																									disabled : k
																								});
																						e.pagernextbottom
																								.jqxButton({
																									disabled : k
																								});
																						e.pagerpreviousbottom
																								.jqxButton({
																									disabled : k
																								});
																						e.pagerfirsttop
																								.jqxButton({
																									disabled : k
																								});
																						e.pagerfirstbottom
																								.jqxButton({
																									disabled : k
																								});
																						e.pagerlasttop
																								.jqxButton({
																									disabled : k
																								});
																						e.pagerlastbottom
																								.jqxButton({
																									disabled : k
																								});
																						if (e.pagershowrowscombotop.jqxDropDownList) {
																							if (e.pagermode == "advanced") {
																								e.pagershowrowscombotop
																										.jqxDropDownList({
																											disabled : false
																										});
																								e.pagershowrowscombobottom
																										.jqxDropDownList({
																											disabled : false
																										})
																							}
																						}
																					}
																					e.host
																							.find(
																									".jqx-grid-pager-number")
																							.css(
																									"cursor",
																									k ? "default"
																											: "pointer")
																				}
																				e.host
																						.find(
																								".jqx-grid-group-collapse")
																						.css(
																								"cursor",
																								k ? "default"
																										: "pointer");
																				e.host
																						.find(
																								".jqx-grid-group-expand")
																						.css(
																								"cursor",
																								k ? "default"
																										: "pointer")
																			} else {
																				if (l == "columnsheight") {
																					e
																							._render()
																				} else {
																					if (l == "theme") {
																						b.jqx.utilities
																								.setTheme(
																										d,
																										k,
																										e.host);
																						e.vScrollBar
																								.jqxScrollBar({
																									theme : e.theme
																								});
																						e.hScrollBar
																								.jqxScrollBar({
																									theme : e.theme
																								});
																						if (e.pageable
																								&& e.pagernexttop) {
																							e.pagernexttop
																									.jqxButton({
																										theme : e.theme
																									});
																							e.pagerprevioustop
																									.jqxButton({
																										theme : e.theme
																									});
																							e.pagernextbottom
																									.jqxButton({
																										theme : e.theme
																									});
																							e.pagerpreviousbottom
																									.jqxButton({
																										theme : e.theme
																									});
																							e.pagerfirsttop
																									.jqxButton({
																										theme : e.theme
																									});
																							e.pagerfirstbottom
																									.jqxButton({
																										theme : e.theme
																									});
																							e.pagerlasttop
																									.jqxButton({
																										theme : e.theme
																									});
																							e.pagerlastbottom
																									.jqxButton({
																										theme : e.theme
																									});
																							if (e.pagershowrowscombotop.jqxDropDownList) {
																								if (e.pagermode == "advanced") {
																									e.pagershowrowscombotop
																											.jqxDropDownList({
																												theme : e.theme
																											});
																									e.pagershowrowscombobottom
																											.jqxDropDownList({
																												theme : e.theme
																											})
																								}
																							}
																						}
																						if (e.filterable) {
																							var c = b(".filterconditions");
																							if (c.length > 0) {
																								c
																										.jqxDropDownList({
																											theme : e.theme
																										})
																							}
																							if (e.filtercolumnsList) {
																								e.filtercolumnsList
																										.jqxDropDownList({
																											theme : e.theme
																										})
																							}
																						}
																						e
																								.refresh()
																					} else {
																						e
																								.refresh()
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						},
						_rendercolumnheader : function(f, g, c, d) {
							var e = "4px";
							if (d.columngroups) {
								e = (c / 2 - this._columnheight / 2);
								if (e < 0) {
									e = 4
								}
								e += "px"
							} else {
								if (this.columnsheight != 25) {
									e = (this.columnsheight / 2 - this._columnheight / 2);
									if (e < 0) {
										e = 4
									}
									e += "px"
								}
							}
							return '<div style="overflow: hidden; text-overflow: ellipsis; text-align: '
									+ g
									+ "; margin-left: 4px; margin-right: 4px; margin-bottom: "
									+ e
									+ "; margin-top: "
									+ e
									+ ';"><span style="text-overflow: ellipsis; cursor: default; margin-left:5px">' //zk modified
									+ f + "</span></div>"
						}
					});
	function a(c, d) {
		this.owner = c;
		this.datafield = null;
		this.displayfield = null;
		this.text = "";
		this.sortable = true;
		this.editable = true;
		this.hidden = false;
		this.groupable = true;
		this.renderer = null;
		this.cellsrenderer = null;
		this.columntype = null;
		this.cellsformat = "";
		this.align = "left";
		this.cellsalign = "left";
		this.width = "auto";
		this.minwidth = 25;
		this.maxwidth = "auto";
		this.pinned = false;
		this.visibleindex = -1;
		this.filterable = true;
		this.filter = null;
		this.resizable = true;
		this.draggable = true;
		this.initeditor = null;
		this.createeditor = null;
		this.destroyeditor = null;
		this.geteditorvalue = null;
		this.validation = null;
		this.classname = "";
		this.cellclassname = "";
		this.aggregates = null;
		this.aggregatesrenderer = null;
		this.rendered = null;
		this.exportable = true;
		this.nullable = true;
		this.columngroup = null;
		this.columntype = "textbox";
		this.getcolumnproperties = function() {
			return {
				nullable : this.nullable,
				sortable : this.sortable,
				hidden : this.hidden,
				groupable : this.groupable,
				width : this.width,
				align : this.align,
				editable : this.editable,
				minwidth : this.minwidth,
				maxwidth : this.maxwidth,
				resizable : this.resizable,
				datafield : this.datafield,
				text : this.text,
				exportable : this.exportable,
				cellsalign : this.cellsalign,
				pinned : this.pinned,
				cellsformat : this.cellsformat,
				columntype : this.columntype,
				classname : this.classname,
				cellclassname : this.cellclassname,
				menu : this.menu
			}
		}, this.setproperty = function(e, f) {
			if (this[e]) {
				var g = this[e];
				this[e] = f;
				this.owner._columnPropertyChanged(this, e, f, g)
			} else {
				if (this[e.toLowerCase()]) {
					var g = this[e.toLowerCase()];
					this[e.toLowerCase()] = f;
					this.owner._columnPropertyChanged(this, e.toLowerCase(), f,
							g)
				}
			}
		};
		this._initfields = function(f) {
			if (f != null) {
				var e = this;
				if (b.jqx.hasProperty(f, "dataField")) {
					this.datafield = b.jqx.get(f, "dataField")
				}
				if (b.jqx.hasProperty(f, "displayField")) {
					this.displayfield = b.jqx.get(f, "displayField")
				} else {
					this.displayfield = this.datafield
				}
				if (b.jqx.hasProperty(f, "columnType")) {
					this.columntype = b.jqx.get(f, "columnType")
				}
				if (b.jqx.hasProperty(f, "validation")) {
					this.validation = b.jqx.get(f, "validation")
				}
				if (b.jqx.hasProperty(f, "text")) {
					this.text = b.jqx.get(f, "text")
				}
				if (b.jqx.hasProperty(f, "sortable")) {
					this.sortable = b.jqx.get(f, "sortable")
				}
				if (b.jqx.hasProperty(f, "hidden")) {
					this.hidden = b.jqx.get(f, "hidden")
				}
				if (b.jqx.hasProperty(f, "groupable")) {
					this.groupable = b.jqx.get(f, "groupable")
				}
				if (b.jqx.hasProperty(f, "renderer")) {
					this.renderer = b.jqx.get(f, "renderer")
				}
				if (b.jqx.hasProperty(f, "align")) {
					this.align = b.jqx.get(f, "align")
				}
				if (b.jqx.hasProperty(f, "cellsAlign")) {
					this.cellsalign = b.jqx.get(f, "cellsAlign")
				}
				if (b.jqx.hasProperty(f, "cellsFormat")) {
					this.cellsformat = b.jqx.get(f, "cellsFormat")
				}
				if (b.jqx.hasProperty(f, "width")) {
					this.width = b.jqx.get(f, "width")
				}
				if (b.jqx.hasProperty(f, "minWidth")) {
					this.minwidth = b.jqx.get(f, "minWidth")
				}
				if (b.jqx.hasProperty(f, "maxWidth")) {
					this.maxwidth = b.jqx.get(f, "maxWidth")
				}
				if (b.jqx.hasProperty(f, "cellsRenderer")) {
					this.cellsrenderer = b.jqx.get(f, "cellsRenderer")
				}
				if (b.jqx.hasProperty(f, "columnType")) {
					this.columntype = b.jqx.get(f, "columnType")
				}
				if (b.jqx.hasProperty(f, "pinned")) {
					this.pinned = b.jqx.get(f, "pinned")
				}
				if (b.jqx.hasProperty(f, "filterable")) {
					this.filterable = b.jqx.get(f, "filterable")
				}
				if (b.jqx.hasProperty(f, "filter")) {
					this.filter = b.jqx.get(f, "filter")
				}
				if (b.jqx.hasProperty(f, "resizable")) {
					this.resizable = b.jqx.get(f, "resizable")
				}
				if (b.jqx.hasProperty(f, "draggable")) {
					this.draggable = b.jqx.get(f, "draggable")
				}
				if (b.jqx.hasProperty(f, "editable")) {
					this.editable = b.jqx.get(f, "editable")
				}
				if (b.jqx.hasProperty(f, "initEditor")) {
					this.initeditor = b.jqx.get(f, "initEditor")
				}
				if (b.jqx.hasProperty(f, "createEditor")) {
					this.createeditor = b.jqx.get(f, "createEditor")
				}
				if (b.jqx.hasProperty(f, "destroyEditor")) {
					this.destroyeditor = b.jqx.get(f, "destroyEditor")
				}
				if (b.jqx.hasProperty(f, "getEditorValue")) {
					this.geteditorvalue = b.jqx.get(f, "getEditorValue")
				}
				if (b.jqx.hasProperty(f, "className")) {
					this.classname = b.jqx.get(f, "className")
				}
				if (b.jqx.hasProperty(f, "cellClassName")) {
					this.cellclassname = b.jqx.get(f, "cellClassName")
				}
				if (b.jqx.hasProperty(f, "aggregates")) {
					this.aggregates = b.jqx.get(f, "aggregates")
				}
				if (b.jqx.hasProperty(f, "aggregatesRenderer")) {
					this.aggregatesrenderer = b.jqx
							.get(f, "aggregatesRenderer")
				}
				if (b.jqx.hasProperty(f, "rendered")) {
					this.rendered = b.jqx.get(f, "rendered")
				}
				if (b.jqx.hasProperty(f, "exportable")) {
					this.exportable = b.jqx.get(f, "exportable")
				}
				if (b.jqx.hasProperty(f, "nullable")) {
					this.nullable = b.jqx.get(f, "nullable")
				}
				if (b.jqx.hasProperty(f, "columnGroup")) {
					this.columngroup = b.jqx.get(f, "columnGroup")
				}
				if (!f instanceof String && !(typeof f == "string")) {
					for ( var g in f) {
						if (!e.hasOwnProperty(g)) {
							if (!e.hasOwnProperty(g.toLowerCase())) {
								c.host.remove();
								throw new Error(
										"jqxDataTable: Invalid property name - "
												+ g + ".")
							}
						}
					}
				}
			}
		};
		this._initfields(d);
		return this
	}
	b.jqx.collection = function(c) {
		this.records = new Array();
		this.owner = c;
		this.updating = false;
		this.beginupdate = function() {
			this.updating = true
		};
		this.resumeupdate = function() {
			this.updating = false
		};
		this.clear = function() {
			this.records = new Array()
		};
		this.replace = function(e, d) {
			this.records[e] = d
		};
		this.isempty = function(d) {
			if (this.records[d] == undefined) {
				return true
			}
			return false
		};
		this.initialize = function(d) {
			if (d < 1) {
				d = 1
			}
			this.records[d - 1] = -1
		};
		this.length = function() {
			return this.records.length
		};
		this.indexOf = function(d) {
			return this.records.indexOf(d)
		};
		this.add = function(d) {
			if (d == null) {
				return false
			}
			this.records[this.records.length] = d;
			return true
		};
		this.insertAt = function(e, d) {
			if (e == null || e == undefined) {
				return false
			}
			if (d == null) {
				return false
			}
			if (e >= 0) {
				if (e < this.records.length) {
					this.records.splice(e, 0, d);
					return true
				} else {
					return this.add(d)
				}
			}
			return false
		};
		this.remove = function(e) {
			if (e == null || e == undefined) {
				return false
			}
			var d = this.records.indexOf(e);
			if (d != -1) {
				this.records.splice(d, 1);
				return true
			}
			return false
		};
		this.removeAt = function(e) {
			if (e == null || e == undefined) {
				return false
			}
			if (e < 0) {
				return false
			}
			if (e < this.records.length) {
				var d = this.records[e];
				this.records.splice(e, 1);
				return true
			}
			return false
		};
		return this
	};
	b.jqx.dataView = function() {
		this.that = this;
		this.grid = null;
		this.records = [];
		this.rows = [];
		this.columns = [];
		this.filters = new Array();
		this.pagesize = 0;
		this.pagenum = 0;
		this.source = null;
		this.databind = function(p, k) {
			var o = p._source ? true : false;
			var e = null;
			this._sortData = null;
			this._sortHierarchyData = null;
			if (o) {
				e = p;
				p = p._source
			} else {
				e = new b.jqx.dataAdapter(p, {
					autoBind : false
				})
			}
			var c = function(m) {
				e.recordids = [];
				e.records = new Array();
				e.cachedrecords = new Array();
				e.originaldata = new Array();
				e._options.totalrecords = m.totalrecords;
				e._options.originaldata = m.originaldata;
				e._options.recordids = m.recordids;
				e._options.cachedrecords = new Array();
				e._options.pagenum = m.pagenum;
				e._options.pageable = m.pageable;
				if (p.type != undefined) {
					e._options.type = p.type
				}
				if (p.formatdata != undefined) {
					e._options.formatData = p.formatdata
				}
				if (p.contenttype != undefined) {
					e._options.contentType = p.contenttype
				}
				if (p.async != undefined) {
					e._options.async = p.async
				}
				if (p.updaterow != undefined) {
					e._options.updaterow = p.updaterow
				}
				if (p.addrow != undefined) {
					e._options.addrow = p.addrow
				}
				if (p.deleterow != undefined) {
					e._options.deleterow = p.deleterow
				}
				if (m.pagesize == 0) {
					m.pagesize = 10
				}
				e._options.pagesize = m.pagesize
			};
			var r = function(m) {
				m.originaldata = e.originaldata;
				m.records = e.records;
				m.hierarchy = e.hierarchy;
				if (!m.hierarchy) {
					m.hierarchy = new Array();
					e.hierarchy = new Array()
				}
				if (e._source.totalrecords) {
					m.totalrecords = e._source.totalrecords
				} else {
					if (e._source.totalRecords) {
						m.totalrecords = e._source.totalRecords
					} else {
						if (m.hierarchy.length !== 0) {
							m.totalrecords = m.hierarchy.length
						} else {
							m.totalrecords = m.records.length
						}
					}
				}
				m.cachedrecords = e.cachedrecords
			};
			c(this);
			this.source = p;
			if (k !== undefined) {
				uniqueId = k
			}
			var f = this;
			switch (p.datatype) {
			case "local":
			case "array":
			default:
				if (p.localdata == null) {
					p.localdata = []
				}
				if (p.localdata != null) {
					e.unbindBindingUpdate(f.grid.element.id);
					e.dataBind();
					var j = function() {
						r(f);
						f.update()
					};
					j();
					e.bindBindingUpdate(f.grid.element.id, j)
				}
				break;
			case "json":
			case "jsonp":
			case "xml":
			case "xhtml":
			case "script":
			case "text":
			case "csv":
			case "tab":
				if (p.localdata != null) {
					e.unbindBindingUpdate(f.grid.element.id);
					e.dataBind();
					var j = function(m) {
						r(f);
						f.update()
					};
					j();
					e.bindBindingUpdate(f.grid.element.id, j);
					return
				}
				var s = {};
				var n = 0;
				var t = {};
				for (var h = 0; h < this.filters.length; h++) {
					var d = this.filters[h].datafield;
					var i = this.filters[h].filter;
					var g = i.getfilters();
					t[d + "operator"] = i.operator;
					for (var q = 0; q < g.length; q++) {
						g[q].datafield = d;
						var l = g[q].value;
						t["filtervalue" + n] = l.toString();
						t["filtercondition" + n] = g[q].condition;
						t["filteroperator" + n] = g[q].operator;
						t["filterdatafield" + n] = d;
						n++
					}
				}
				t.filterslength = n;
				b.extend(t, {
					sortdatafield : f.sortfield,
					sortorder : f.sortfielddirection,
					pagenum : f.pagenum,
					pagesize : f.grid.pagesize
				});
				var u = e._options.data;
				if (e._options.data) {
					b.extend(e._options.data, t)
				} else {
					if (p.data) {
						b.extend(t, p.data)
					}
					e._options.data = t
				}
				var j = function() {
					var v = b.jqx.browser.msie && b.jqx.browser.version < 9;
					var w = function() {
						r(f);
						f.update()
					};
					if (v) {
						try {
							w()
						} catch (m) {
						}
					} else {
						w()
					}
				};
				e.unbindDownloadComplete(f.grid.element.id);
				e.bindDownloadComplete(f.grid.element.id, j);
				e._source.loaderror = function(w, m, v) {
					j()
				};
				e.dataBind();
				e._options.data = u
			}
		};
		this.addfilter = function(f, e) {
			this._sortData = null;
			this._sortHierarchyData = null;
			var d = -1;
			for (var c = 0; c < this.filters.length; c++) {
				if (this.filters[c].datafield == f) {
					d = c;
					break
				}
			}
			if (d == -1) {
				this.filters[this.filters.length] = {
					filter : e,
					datafield : f
				}
			} else {
				this.filters[d] = {
					filter : e,
					datafield : f
				}
			}
		};
		this.removefilter = function(d) {
			this._sortData = null;
			this._sortHierarchyData = null;
			for (var c = 0; c < this.filters.length; c++) {
				if (this.filters[c].datafield == d) {
					this.filters.splice(c, 1);
					break
				}
			}
		};
		this.sortby = function(e, c) {
			var d = this;
			if (c == null) {
				this.sortfield = "";
				this.sortfielddirection = "";
				return
			}
			if (c == undefined) {
				c = true
			}
			if (c == "a" || c == "asc" || c == "ascending" || c == true) {
				c = true
			} else {
				c = false
			}
			if (e == "constructor") {
				e = ""
			}
			this.sortfield = e;
			this.sortfielddirection = c ? "asc" : "desc"
		};
		this._sort = function(d) {
			if (!this.sortfield || !this.sortfielddirection) {
				return d
			}
			if (this._sortfield == this.sortfield
					&& this._sortfielddirection == this.sortfielddirection
					&& this._sortData) {
				return this._sortData
			}
			var g = this;
			var j = Object.prototype.toString;
			Object.prototype.toString = (typeof g.sortfield == "function") ? g.sortfield
					: function() {
						return this[g.sortfield]
					};
			var f = "";
			if (this.source.datafields) {
				b.each(this.source.datafields, function() {
					if (this.name == g.sortfield) {
						if (this.type) {
							f = this.type
						}
						return false
					}
				})
			}
			var c = new Array();
			for (var e = 0; e < d.length; e++) {
				c.push(b.extend({
					originalRecord : d[e]
				}, d[e]))
			}
			this._sortfield = this.sortfield;
			this._sortfielddirection = this.sortfielddirection;
			if (this.sortfielddirection === "desc") {
				var h = c.sort(function(k, i) {
					return g._compare(k, i, f)
				}).reverse()
			} else {
				var h = c.sort(function(k, i) {
					return g._compare(k, i, f)
				})
			}
			this._sortData = h;
			Object.prototype.toString = j;
			return h
		};
		this._compare = function(d, c, f) {
			var d = d;
			var c = c;
			if (d === undefined) {
				d = null
			}
			if (c === undefined) {
				c = null
			}
			if (d === null && c === null) {
				return 0
			}
			if (d === null && c !== null) {
				return 1
			}
			if (d !== null && c === null) {
				return 1
			}
			d = d.toString();
			c = c.toString();
			if (b.jqx.dataFormat) {
				if (f && f != "") {
					switch (f) {
					case "number":
					case "int":
					case "float":
						if (d < c) {
							return -1
						}
						if (d > c) {
							return 1
						}
						return 0;
					case "date":
					case "time":
						if (d < c) {
							return -1
						}
						if (d > c) {
							return 1
						}
						return 0;
					case "string":
					case "text":
						d = String(d).toLowerCase();
						c = String(c).toLowerCase();
						break
					}
				} else {
					if (b.jqx.dataFormat.isNumber(d)
							&& b.jqx.dataFormat.isNumber(c)) {
						if (d < c) {
							return -1
						}
						if (d > c) {
							return 1
						}
						return 0
					} else {
						if (b.jqx.dataFormat.isDate(d)
								&& b.jqx.dataFormat.isDate(c)) {
							if (d < c) {
								return -1
							}
							if (d > c) {
								return 1
							}
							return 0
						} else {
							if (!b.jqx.dataFormat.isNumber(d)
									&& !b.jqx.dataFormat.isNumber(c)) {
								d = String(d).toLowerCase();
								c = String(c).toLowerCase()
							}
						}
					}
				}
			}
			try {
				if (d < c) {
					return -1
				}
				if (d > c) {
					return 1
				}
			} catch (e) {
				var g = e
			}
			return 0
		};
		this._equals = function(d, c) {
			return (this._compare(d, c) === 0)
		};
		this.evaluate = function(p) {
			if (this.grid.serverProcessing) {
				if (p) {
					if (this.grid.source._source.id == ""
							|| this.grid.source._source.id == null) {
						if (this.grid.pageable) {
							var c = this.grid.pagesize * this.pagenum;
							this.grid.rowsByKey = new Array();
							var h = this;
							b.each(p, function(i) {
								this.uid = c;
								h.grid.rowsByKey[this.uid] = this;
								c++
							})
						}
					}
				}
				return p
			}
			var d = new Array();
			if (this.filters.length) {
				var j = new Array();
				var o = function(s, w) {
					for (var u = 0; u < s.length; u++) {
						var v = s[u];
						v._visible = true;
						var q = undefined;
						for (var t = 0; t < this.filters.length; t++) {
							var r = this.filters[t].filter;
							var x = v[this.filters[t].datafield];
							var y = r.evaluate(x);
							if (q == undefined) {
								q = y
							} else {
								if (r.operator == "or") {
									q = q || y
								} else {
									q = q && y
								}
							}
						}
						v._visible = false;
						if (q || v.aggregate) {
							v._visible = true;
							w.push(v);
							j[v.uid] = v
						}
					}
				};
				if (!this._filteredData) {
					if (this.source.hierarchy
							|| (this.grid.source.hierarchy && this.grid.source.hierarchy.length > 0)) {
						var n = new Array();
						var k = function(r, s) {
							for (var q = 0; q < s.length; q++) {
								var t = s[q];
								n.push(t);
								if (t.records && t.records.length > 0) {
									k(t, t.records)
								}
							}
						};
						k(null, p);
						o.call(this, n, d);
						for (var e = 0; e < d.length; e++) {
							var g = d[e];
							while (g.parent) {
								var m = g.parent;
								if (!j[m.uid]) {
									m._visible = true;
									j[m.uid] = m
								}
								g = m
							}
						}
						d = p
					} else {
						o.call(this, p, d)
					}
					this._filteredData = d;
					this.rows = d
				} else {
					this.rows = this._filteredData
				}
			} else {
				this.rows = p
			}
			if (this.source.hierarchy
					|| (this.grid.source.hierarchy && this.grid.source.hierarchy.length > 0)) {
				var h = this;
				var l = new Array();
				this._sortData = null;
				var f = function(t, q) {
					h._sortData = null;
					var r = null;
					if (h.source.hierarchy.groupingDataFields) {
						if (q
								&& q.length > 0
								&& q[0].level < h.source.hierarchy.groupingDataFields.length) {
							r = new Array();
							for (var s = 0; s < q.length; s++) {
								r.push(b.extend({
									originalRecord : q[s]
								}, q[s]))
							}
						} else {
							r = h._sort(q)
						}
					} else {
						r = h._sort(q)
					}
					if (t.records) {
						t.records = r
					} else {
						t = t.concat(r)
					}
					for (var s = 0; s < r.length; s++) {
						if (r[s].records && r[s].records.length) {
							f(r[s], r[s].records)
						}
					}
					return t
				};
				if (this.sortfield || this.sortfielddirection) {
					if (this._sortHierarchyData) {
						l = this._sortHierarchyData
					} else {
						l = f(l, p)
					}
					this.rows = l;
					this._sortHierarchyData = l
				}
			} else {
				this.rows = this._sort(this.rows)
			}
			return this.rows
		};
		this.getid = function(j, d, e) {
			if (b(j, d).length > 0) {
				return b(j, d).text()
			}
			if (this.rows && j != "" && j != undefined && this.rows.length > 0) {
				var h = this.rows[this.rows.length - 1][j];
				if (h == null) {
					h = null
				}
				for (var f = 1; f <= 100; f++) {
					var g = this.grid.rowsByKey[f + h];
					if (!g) {
						return h + f
					}
				}
			}
			if (j) {
				if (j.toString().length > 0) {
					var c = b(d).attr(j);
					if (c != null && c.toString().length > 0) {
						return c
					}
				}
			}
			return e
		};
		this.generatekey = function() {
			var c = function() {
				return (((1 + Math.random()) * 16) | 0)
			};
			return ("" + c() + c() + "-" + c() + "-" + c())
		};
		return this
	}
})(jQuery);