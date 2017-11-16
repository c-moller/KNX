window.LogView = Backbone.View.extend({
    
    renderedOnce : false,
    seriesUnitsList : [],
    unitsList : [],
    labelUnitsList : [],
    linkUnitsList : [],
    unitNameList : [],
    seriesNoUnitList : [],
    labelNoUnitList : [],
    linkNoUnitList : [],

    initialize: function() {
        this.render();
    },

    render: function() {;
        if (this.renderedOnce === false) {
            this.renderedOnce = true;
            $(this.el).html(this.template());
            var self = this;
            var jsonDoc, i, txt, arrayDoc, loadhttp;
            loadhttp = $.get("/rest/items", function(data) {
                readItems(data);
            });

            function readItems(doc) {
                arrayDoc = JSON.stringify(doc);
                txt = "";
                //JsonDoc = JSON.parse(ArrayDoc);
                try {
                    jsonDoc = JSON.parse(arrayDoc);
                } catch (e) {
                    console.log("Exception while JSON.parse " + e);
                    var re = /[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g;
                    jsonDoc = arrayDoc.replace(re, '')
                    console.log("After replacing characters: " + jsonDoc);
                    try {
                        jsonDoc = JSON.parse(arrayDoc);
                    } catch (e) {
                        console.log("Exception in createPanelConfigJson AGAIN JSON.parse " + e);
                        return;
                    }
                }
                var jsonLen = jsonDoc.length;
                for (var i = 0; i < jsonLen; i++) {
                    if (jsonDoc[i].stateDescription !== undefined) {
                        if(jsonDoc[i].name!==""){ //get rid of items without valid address
                            self.seriesUnitsList.push(jsonDoc[i].name);
                            self.unitNameList.push(jsonDoc[i].unit);
                            self.unitsList.push(jsonDoc[i].stateDescription.pattern);
                            self.labelUnitsList.push(jsonDoc[i].label);
                            self.linkUnitsList.push(jsonDoc[i].link);
                        }
                    }else {
                        self.seriesNoUnitList.push(jsonDoc[i].name);
                        self.labelNoUnitList.push(jsonDoc[i].label);
                        self.linkNoUnitList.push(jsonDoc[i].link);
                    }
                }
                self.LoadItemNames();
            }   
        }
        return this;
    },
    events: {
        "click .HiddenMenuButton": "ShowForm",
        "click #help": "ShowHelp",
        "change #RoomSelect": "loadGraphs",
        "change #ColorSelect": "loadGraphs",
        "change #UnitSelect": "loadGraphs",
        "change #TimeSelect": "loadGraphs"
    },
    //Colour menu btn
    ShowForm: function() {
        var that = this;
        x = that.$el.find('.hiddenForm')
        x.toggle();
    },
    //Help modal display 
    ShowHelp: function() {
        $('#Help').modal('show');
        return false;
    },
    //Get Room and Unit names from subnet items page and add to dropdown
    LoadItemNames: function () {
    var that=this;
    var seriesUnits=this.seriesUnitsList;
    var units=this.unitsList;
    var labelUnits=this.labelUnitsList;
    var linkUnits=this.linkUnitsList;
    var nameUnits=this.unitNameList;  
    var roomString=[];
    var unitString=[];

        var labelLen=labelUnits.length;
        for (i = 0; i < labelLen; i++) {
            if (labelUnits[i] !== undefined) {
                index = labelUnits[i].indexOf(" - "); // Gets the first index where a space occours
                roomString[i] = labelUnits[i].substr(0, index); // Gets the first part 
            }
            if (units[i] !== undefined) {
                unitString[i] = units[i];
            }
        }
        //Write room label into drop-down
        var roomStringSort = roomString.sort();
        var roomLen=roomString.length;
        that.$el.find('#RoomSelect').append($('<option>').text(roomStringSort[0]).attr('value', roomStringSort[0]));
        for (j = 1; j < roomLen; j++) {
            var compare = roomStringSort[j - 1] == roomStringSort[j];
            if (compare == false) {
                that.$el.find('#RoomSelect').append($('<option>').text(roomStringSort[j]).attr('value', roomStringSort[j]));
            }
        }
        //Write unit label into drop-down
        var unitNameSort = nameUnits.sort();
        var unitLen =unitNameSort.length;
        for (i = 0; i < unitLen; i++) {
            if (unitNameSort[i] !== undefined) {
                if (unitNameSort[i] == "") {
                    unitNameSort[i] = "ON/OFF";
                }
            }
        }
        that.$el.find('#UnitSelect').append($('<option>').text(unitNameSort[0]).attr('value', unitNameSort[0]));
        for (j = 1; j < unitLen; j++) {
            var compare = unitNameSort[j - 1] == unitNameSort[j];
            if (compare == false) {
                that.$el.find('#UnitSelect').append($('<option>').text(unitNameSort[j]).attr('value', unitNameSort[j]));
            }
        }
        console.log("Loaded Rooms: " + roomStringSort);
        console.log("Loaded Units: " + unitNameSort);
            //Display graphs
    this.loadGraphs();
},

loadGraphs: function(){
    var that=this;
    var self=this;
    console.log("--------------------------------------------------------------------------------------");

    /*Clear old charts on reload */
    function clearDivs(numOfItems) {
        for(var i=numOfItems+1; i<17;i++){
            $('#item'+i).empty();
        }
        $('#chartdiv').empty();
    }

    /*Convert Time */
    var startTime = function(period) {
        var startDate = new Date();
        switch (period){
            case 'h': startDate.setTime(startDate.getTime() - 60*60*1000); break;
            case '4h': startDate.setTime(startDate.getTime() - 4*60*60*1000); break;
            case '8h': startDate.setTime(startDate.getTime() - 8*60*60*1000); break;
            case '12h': startDate.setTime(startDate.getTime() - 12*60*60*1000); break;
            case 'D': startDate.setTime(startDate.getTime() - 24*60*60*1000); break;
            case '3D': startDate.setTime(startDate.getTime() - 3*24*60*60*1000); break;
            case 'W': startDate.setTime(startDate.getTime() - 7*24*60*60*1000); break;
            case '2W': startDate.setTime(startDate.getTime() - 2*7*24*60*60*1000); break;
            case 'M': startDate.setTime(startDate.getTime() - 31*24*60*60*1000); break; //Well...
            case '2M': startDate.setTime(startDate.getTime() - 2*31*24*60*60*1000); break;
            case '4M': startDate.setTime(startDate.getTime() - 4*31*24*60*60*1000); break;
            case 'Y': startDate.setTime(startDate.getTime() - 12*31*24*60*60*1000); break;
            default: startDate.setTime(startDate.getTime() - 24*60*60*1000); break;
        }
        return startDate;
    }
        /*Get time period based on user input */
    var Type_format;
    var period = that.$el.find('#TimeSelect').val();
    switch (period){
        case 'h': Type_format='HH:mm'; break;
        case '4h': Type_format= 'HH:mm'; break;
        case '8h': Type_format= 'HH:mm'; break;
        case '12h': Type_format= 'HH:mm'; break;
        case 'D': Type_format= 'HH:mm'; break;
        case '3D': Type_format= 'EEE HH:mm'; break;
        case 'W': Type_format= 'EEE dd/MM'; break;
        case '2W': Type_format= 'EEE dd/MM'; break;
        case 'M': Type_format= 'EEE dd/MM'; break;
        case '2M': Type_format= 'dd/MM'; break;
        case '4M': Type_format= 'MMM'; break;
        case 'Y': Type_format= 'MMM'; break;
        default: Type_format= 'EEE dd/MM'; break;
    }

    var ColorScheme = [];
    var hexSelect = that.$el.find('#ColorSelect').val();
    switch (hexSelect){
        case 'KNX': ColorScheme=['#2196F3', '#2EA443','#134EDC','#43F062','#13B8DC']; break;
        case 'red': ColorScheme= ['#F44336', '#74201A','#C1352B','#F68880','#DD2656']; break;
        case 'blue': ColorScheme= ['#2196F3', '#134EDC','#13B8DC','#151CFA','#15FAE5']; break;
        case 'green': ColorScheme= ['#2EA443', '#43F062','#20712E','#68B375','#8CF09E']; break;
        default: ColorScheme= ['#2196F3', '#2EA443','#134EDC','#43F062','#13B8DC']; break;
    }
    //Compute Start UNIX time
    var startDate = startTime(period);
    var Time_Data = startDate.getTime();
    console.log("Selected Period: " + period +" | Data Start Date/Time: " + startDate+ "--> Unix time: " + Time_Data);
    //Load items page for subnet and find items with StateDescription(can plot) and without
    
    sortUnit(self.seriesUnitsList, self.unitsList, self.labelUnitsList, self.linkUnitsList, self.unitNameList);
    //Sort variables per unit type
    function sortUnit(seriesNameList, unitList, labelList, linksList, unitNameList) {
            var Type_format, testString1, testString2, index2, index;
            var roomName = [];
            //Read user selected unit
            var unitString = that.$el.find('#UnitSelect').val();
            var roomSelectString = that.$el.find('#RoomSelect').val();
            seriesName = [];
            label = [];
            link = [];
            ylabel = [];
            var labelLen=labelList.length;
            var unitLen=unitList.length;
            for (k = 0; k < labelLen; k++) {
                if (labelList[k] !== undefined) {
                    index = labelList[k].indexOf(" - ");
                    roomName[k] = labelList[k].substr(0, index);
                }
                if (unitNameList[k] !== undefined) {
                    if (unitNameList[k] == "") {
                        unitNameList[k] = "ON/OFF";
                    }
                }
            }
            for (i = 0; i < unitLen; i++) {
                if (unitString == "All" && roomSelectString == "All") {
                    seriesName.push(seriesNameList[i]);
                    label.push(labelList[i]);
                    link.push(linksList[i]);
                    if (unitNameList[i] !== undefined) {
                        if (unitNameList[i] == "") {
                            ylabel.push("ON/OFF");
                        } else {
                            ylabel.push(unitNameList[i]);
                        }
                    }
                    //Display all rooms for selected unit
                } else if (roomSelectString == "All") {
                    //Symbol ° not readable so sort Weather variables using label; "Weather - ..."
                    if (labelList[i] !== undefined) {
                        index = labelList[i].indexOf(" - "); // Gets the first index where a space occours
                        testString1 = labelList[i].substr(0, index); // Gets the first part
                        testString2 = labelList[i].substr(index + 3);
                    }
                    if(unitNameList[i] !== undefined){
                        if (unitNameList[i].toUpperCase() == unitString.toUpperCase()) {
                            seriesName.push(seriesNameList[i]);
                            label.push(labelList[i]);
                            link.push(linksList[i]);
                            ylabel.push(unitNameList[i]);
                        } else if (testString1.toUpperCase() == unitString.toUpperCase()) {
                            seriesName.push(seriesNameList[i]);
                            label.push(labelList[i]);
                            link.push(linksList[i]);
                            ylabel.push(unitNameList[i]);
                        } else if (testString2.toUpperCase() == unitString.toUpperCase()) {
                            seriesName.push(seriesName[i]);
                            label.push(labelList[i]);
                            link.push(linksList[i]);
                            ylabel.push(unitNameList[i]);
                        }
                    }
                // Display all units for selected room items
                } else if (unitString == "All") {
                    if (roomName[i] == roomSelectString) {
                        seriesName.push(seriesNameList[i]);
                        label.push(labelList[i]);
                        link.push(linksList[i]);
                        ylabel.push(unitNameList[i]);
                    }
                    //Display selected room and unit 
                } else {
                    if (labelList[i] !== undefined) {
                        index = labelList[i].indexOf(" - "); // Gets the first index where a space occours
                        testString1 = labelList[i].substr(0, index); // Gets the first part
                        testString2 = labelList[i].substr(index + 3);
                    }
                    if(unitNameList[i] !== undefined){
                        if (roomName[i] == roomSelectString) {
                            if (unitNameList[i].toUpperCase() == unitString.toUpperCase()) {
                                seriesName.push(seriesNameList[i]);
                                label.push(labelList[i]);
                                link.push(linksList[i]);
                                ylabel.push(unitNameList[i]);
                            } else if (testString1.toUpperCase() == unitString.toUpperCase()) {
                                seriesName.push(seriesNameList[i]);
                                label.push(labelList[i]);
                                link.push(linksList[i]);
                                ylabel.push(unitNameList[i]);
                            } else if (testString2.toUpperCase() == unitString.toUpperCase()) {
                                seriesName.push(seriesNameList[i]);
                                label.push(labelList[i]);
                                link.push(linksList[i]);
                                ylabel.push(unitNameList[i]);
                            } else {
                                console.log("No data for selected room and units");
                            }
                        }
                    }
                }
            }
            console.log("Selected Label: " + label);
            getData(link, seriesName, label, ylabel);
        }
        //Open XML file for the selected datasets
        function getData(link, nameSeries, label, ylabel) {
            var v = 0;
            var labelLen=label.length;
            for (i = 0; i < labelLen; i++) {
                $.ajax({
                    type: "GET",
                    url: link[i] + nameSeries[i] + "?starttime=" + Time_Data,
                    dataType: "xml",
                    success: getDoc
                });
                    function getDoc(xml){
                        readXML(xml, label, nameSeries, ylabel);
                    }
                v++;
            }
            clearDivs(v);
        }
        var pieState=[];
        var pieLabel=[];
        var count;
        //read time point data and sort for line plot
        function readXML(xml, label, nameSeries, ylabel) {
            var finaldata, seriesname, i,j,t,st, txt, xmlDoc, ChartDiv, unitSelect, ChartTitle, DivSelect, ChartColor, AxisLabel;
            var state = [];
            var date = [];
            var tps = [];
            var stt = [];
            var time = [];
            xmlDoc = xml;
            txt = "";
            var series = $(xmlDoc).find("name").text();;
            //Convert XML data to chart values
            finaldata = $(xmlDoc).find("data");
            var finaldataLen = finaldata.length;
            if (finaldataLen > 1) {
                t = $(xmlDoc).find("time");
                st = $(xmlDoc).find("state");
                for (j = 0; j < finaldataLen; j++) {
                    date[j] = new Date();
                    time[j] = t[j].innerHTML;
                    tps[j] = parseFloat(time[j]);
                    date[j].setTime(time[j]);
                    stt[j] = st[j].innerHTML;
                    state[j] = parseFloat(stt[j]);
                }
            }
            //Give Label to data and select correct div placement
            var seriesLen=nameSeries.length;
            var stateLen=state.length;
            for (i = 0; i < seriesLen; i++) {
                if (series == nameSeries[i]) {
                    ChartTitle = label[i];
                    AxisLabel = ylabel[i];
                    DivSelect = i;
                    if (AxisLabel == "%") {
                        for (j = 0; j < stateLen; j++) {
                            state[j] = state[j] * 100;
                        }
                    }
                }
            }
            //Select chart placement and color scheme
            switch (DivSelect) {
                case 0:ChartDiv = 'item1'; ChartColor=ColorScheme[0]; break;
                case 1:ChartDiv = 'item2'; ChartColor=ColorScheme[1]; break;
                case 2:ChartDiv = 'item3'; ChartColor=ColorScheme[2]; break;
                case 3:ChartDiv = 'item4'; ChartColor=ColorScheme[3]; break;
                case 4:ChartDiv = 'item5'; ChartColor=ColorScheme[0]; break;
                case 5:ChartDiv = 'item6'; ChartColor=ColorScheme[2]; break;
                case 6:ChartDiv = 'item7'; ChartColor=ColorScheme[1]; break;
                case 7:ChartDiv = 'item8'; ChartColor=ColorScheme[3]; break;
                case 8:ChartDiv = 'item9'; ChartColor=ColorScheme[0]; break;
                case 9:ChartDiv = 'item10'; ChartColor=ColorScheme[1]; break;
                case 10:ChartDiv = 'item11'; ChartColor=ColorScheme[2]; break;
                case 11:ChartDiv = 'item12'; ChartColor=ColorScheme[3]; break;
                case 12:ChartDiv = 'item13'; ChartColor=ColorScheme[0]; break;
                case 13:ChartDiv = 'item14'; ChartColor=ColorScheme[2]; break;
                case 14:ChartDiv = 'item15'; ChartColor=ColorScheme[1]; break;
                case 15:ChartDiv = 'item16'; ChartColor=ColorScheme[3]; break;
                default:ChartDiv = 'chartdiv'; ChartColor=ColorScheme[0]; break;
            }
            drawChart(date, state, ChartDiv, ChartTitle, ChartColor, AxisLabel);
            //Draw Special charts
            unitSelect =that.$el.find('#UnitSelect').val();
            var cmpString = "kW";
            var SubTotal;
            
            if(unitSelect.toUpperCase()==cmpString.toUpperCase()){
                count = 0;
                for (i = stateLen; i--;) {
                    count += state[i];
                }
                pieState.push(count);
                pieLabel.push(ChartTitle);
                var pieLen = pieState.length;
                if (pieLen==seriesLen){
                    var indexOfMaxValue = pieState.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
                    var MaxState=pieState[indexOfMaxValue];
                    SubTotal = MaxState;
                    pieState.splice(indexOfMaxValue,1);
                    pieLabel.splice(indexOfMaxValue,1);
                    var pieLen2 = pieState.length;
                    for (var i = 0, len = pieLen2; i < len; i++) {
                        SubTotal -= pieState[i];
                    }
                    pieState.push(SubTotal);
                    pieLabel.push("Other/Autre");
                    DrawPie(pieState, ColorScheme, pieLabel, unitSelect);
                    console.log("Draw Pie");
                }
            }
            else{
                $('#SpecialChartDiv').empty();
            }
        }  
        // Load the Visualization API       
        function drawChart(date, state, ChartDiv, label, ChartColor, ylabel) {
            var step;
            if(ylabel=="ON/OFF"){
                step=1;
            }
            google.charts.load('current', {
                packages: ['corechart']
            });
            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(LineChart);
            //Line Chart with zoom
            function LineChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('datetime', 'Time of Day');
                data.addColumn('number', ylabel);
                var dateLen=date.length;
                for (i = 0; i < dateLen; i++) {
                    data.addRow([date[i], state[i]]);
                }
                var options = {
                    legend: 'none',
                    title: label,
                    backgroundColor: { 
                        fill:'transparent' 
                    },
                    hAxis: {
                        format: Type_format,
                        titleTextStyle: {color: '#333',italic: false, bold: 'false'}
                    },
                    vAxis: {
                        title: ylabel,
                        minValue: 0,
                        gridlines: {
                            count: step,
                        }
                    },
                    explorer: {
                        actions: ['dragToZoom', 'rightClickToReset'],
                        axis: 'horizontal',
                        keepInBounds: true,
                        maxZoomIn: 4.0
                    },
                    colors: [ChartColor],
                    //modify chart area to maximise size
                    chartArea: { height:'65%', width:'90%', right:0} 
                };
                var chart = new google.visualization.LineChart(document.getElementById(ChartDiv));
                chart.draw(data, options);
            }
        }
        function DrawPie(state, colorScheme,label,unit) {
            google.charts.load('current', {
                packages: ['corechart']
            });
            google.charts.setOnLoadCallback(ChartPie); 
            function ChartPie() {
                // Define the chart to be drawn.
                var len=state.length;
                var data = new google.visualization.DataTable();
                    data.addColumn('string', 'Type');
                    data.addColumn('number', unit);
                    for (i = 0; i < (len); i++) {
                        data.addRow([label[i], state[i]]);
                    }
                    //data.addRow(["Total", state[len]]);


                // Set chart options
                var options = {
                    tooltip: {
                        isHtml: true
                    }, // Use to get rid of flickering tooltip
                    'title': '',
                    'backgroundColor': {
                        'fill': 'transparent'
                    },
                    colors: [colorScheme[3],colorScheme[1],colorScheme[0],colorScheme[2],colorScheme[4],colorScheme[0],colorScheme[2],colorScheme[1],colorScheme[4],colorScheme[3]]
                };
                // Instantiate and draw the chart.
                var chart = new google.visualization.PieChart(document.getElementById('SpecialChartDiv'));
                chart.draw(data, options);
            }
        }
        //that.RefreshPage();
    },
});
