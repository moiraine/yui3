YUI.add("datatable-base",function(B){function M(U){M.superclass.constructor.apply(this,arguments);}M.NAME="column";M.ATTRS={id:{valueFn:"_defaultId",writeOnce:true},key:{valueFn:"_defaultKey"},field:{valueFn:"_defaultField"},label:{valueFn:"_defaultLabel"},keyIndex:{readOnly:true},parent:{readOnly:true},children:{},colspan:{readOnly:true},rowspan:{readOnly:true},thNode:{readOnly:true},thLinerNode:{readOnly:true},thLabelNode:{readOnly:true},abbr:{value:null},className:{},editor:{},formatter:{},resizeable:{},sortable:{},hidden:{},width:{},minWidth:{},maxAutoWidth:{}};B.extend(M,B.Widget,{_defaultId:function(){return B.guid();},_defaultKey:function(U){return U||B.guid();},_defaultField:function(U){return U||this.get("key");},_defaultLabel:function(U){return U||this.get("key");},initializer:function(){},destructor:function(){},syncUI:function(){this._uiSetAbbr(this.get("abbr"));},_afterAbbrChange:function(U){this._uiSetAbbr(U.newVal);},_uiSetAbbr:function(U){this._thNode.set("abbr",U);}});B.Column=M;var D=B.Lang;function E(U){E.superclass.constructor.apply(this,arguments);}E.NAME="columnset";E.ATTRS={columns:{setter:"_setColumns"},tree:{readOnly:true,value:[]},flat:{readOnly:true,value:[]},hash:{readOnly:true,value:{}},keys:{readOnly:true,value:[]}};B.extend(E,B.Base,{_setColumns:function(U){return B.clone(U);},initializer:function(){var U=[],a=[],Z={},Y=[],X=this.get("columns"),V=this;function W(j,d,h){var f=0,c=d.length,e,g,b;j++;if(!U[j]){U[j]=[];}for(;f<c;++f){e=d[f];e=D.isString(e)?{key:e}:e;g=new B.Column(e);e.yuiColumnId=g.get("id");a.push(g);Z[g.get("id")]=g;if(h){g._set("parent",h);}if(D.isArray(e.children)){b=e.children;g._set("children",b);V._setColSpans(g,e);V._cascadePropertiesToChildren(g,b);if(!U[j+1]){U[j+1]=[];}W(j,b,g);}else{g._set("keyIndex",Y.length);g._set("colspan",1);Y.push(g);}U[j].push(g);}j--;}W(-1,X);this._set("tree",U);this._set("flat",a);this._set("hash",Z);this._set("keys",Y);this._setRowSpans();this._setHeaders();},destructor:function(){},_cascadePropertiesToChildren:function(X,V){var W=0,U=V.length,Y;for(;W<U;++W){Y=V[W];if(X.get("className")&&(Y.className===undefined)){Y.className=X.get("className");}if(X.get("editor")&&(Y.editor===undefined)){Y.editor=X.get("editor");}if(X.get("formatter")&&(Y.formatter===undefined)){Y.formatter=X.get("formatter");}if(X.get("resizeable")&&(Y.resizeable===undefined)){Y.resizeable=X.get("resizeable");}if(X.get("sortable")&&(Y.sortable===undefined)){Y.sortable=X.get("sortable");}if(X.get("hidden")){Y.hidden=true;}if(X.get("width")&&(Y.width===undefined)){Y.width=X.get("width");}if(X.get("minWidth")&&(Y.minWidth===undefined)){Y.minWidth=X.get("minWidth");}if(X.get("maxAutoWidth")&&(Y.maxAutoWidth===undefined)){Y.maxAutoWidth=X.get("maxAutoWidth");}}},_setColSpans:function(X,V){var W=0;function U(a){var b=a.children,Z=0,Y=b.length;for(;Z<Y;++Z){if(D.isArray(b[Z].children)){U(b[Z]);}else{W++;}}}U(V);X._set("colspan",W);},_setRowSpans:function(){function U(W){var X=1,Z,Y,V,b;function a(g,f){f=f||1;var e=0,c=g.length,d;for(;e<c;++e){d=g[e];if(D.isArray(d.children)){f++;a(d.children,f);f--;}else{if(d.get&&D.isArray(d.get("children"))){f++;a(d.get("children"),f);f--;}else{if(f>X){X=f;}}}}}for(V=0;V<W.length;V++){Z=W[V];a(Z);for(b=0;b<Z.length;b++){Y=Z[b];if(!D.isArray(Y.get("children"))){Y._set("rowspan",X);}else{Y._set("rowspan",1);}}X=1;}}U(this.get("tree"));},_setHeaders:function(){var Z,X,W=this.get("keys"),V=0,U=W.length;function Y(b,a){b.push(a.get("key"));if(a.get("parent")){Y(b,a.get("parent"));}}for(;V<U;++V){Z=[];X=W[V];Y(Z,X);X._set("headers",Z.reverse().join(" "));}},getColumn:function(){}});B.Columnset=E;var G=B.Lang,T=B.Node,R=B.ClassNameManager.getClassName,F=B.bind,H="basedatatable",P=R(H,"header"),A=R(H,"data"),C=R(H,"msg"),I=R(H,"liner"),N=R(H,"first"),K=R(H,"last"),O='<th id="{id}" rowspan="{rowspan}" colspan="{colspan}"><div class="'+I+'">{value}</div></th>',J='<tr id="{id}"></tr>',Q='<td headers="{headers}"><div class="'+I+'">{value}</div></td>',L="{value}";function S(U){S.superclass.constructor.apply(this,arguments);}S.NAME="baseDataTable";S.ATTRS={columnset:{setter:"_setColumnset"},recordset:{setter:"_setRecordset"},state:{value:new B.State(),readOnly:true},strings:{valueFn:function(){return B.Intl.get("datatable-base");}},thValueTemplate:{value:L},tdValueTemplate:{value:L},trTemplate:{value:J}};S.HTML_PARSER={attrA:function(U){}};B.extend(S,B.Widget,{thTemplate:O,tdTemplate:Q,_theadNode:null,_tbodyNode:null,_msgNode:null,_setColumnset:function(U){return G.isArray(U)?new B.Columnset({columns:U}):U;},_setRecordset:function(U){if(G.isArray(U)){U=new B.Recordset({records:U});}U.addTarget(this);return U;},initializer:function(){this.publish("addTr",{defaultFn:F("_defAddTrFn",this),queuable:false});this.publish("addTd",{defaultFn:F("_defAddTdFn",this),queuable:false});this.publish("addHeaderTr",{defaultFn:F("_defAddHeaderTrFn",this),queuable:false});this.publish("addHeaderTh",{defaultFn:F("_defAddHeaderThFn",this),queuable:false});this.publish("theadCellClick",{emitFacade:false,defaultFn:F("_defTheadCellClickFn",this),queuable:true});this.publish("theadRowClick",{emitFacade:false,defaultFn:F("_defTheadRowClickFn",this),queuable:true});this.publish("theadClick",{emitFacade:false,defaultFn:F("_defTheadClickFn",this),queuable:true});},destructor:function(){this.get("recordset").removeTarget(this);},renderUI:function(){var U=this._createTableNode();U=U?this._createColgroupNode(this._tableNode):false;U=U?this._createTheadNode(this._tableNode):false;U=U?this._createTbodyNode(this._tableNode):false;U=U?this._createMessageNode(this._tableNode):false;U=U?this._createCaptionNode(this._tableNode):false;return U;},_createTableNode:function(){if(!this._tableNode){this._tableNode=this.get("contentBox").appendChild(T.create("<table></table>"));}return this._tableNode;},_createColgroupNode:function(X){var W=this.get("columnset").get("keys"),V=0,U=W.length,Y=["<colgroup>"];for(;V<U;++V){Y.push("<col></col>");}Y.push("</colgroup>");this._colgroupNode=X.insertBefore(T.create(Y.join("")),X.get("firstChild"));
return this._colgroupNode;},_createTheadNode:function(U){if(U){this._theadNode=U.insertBefore(T.create("<thead class='"+P+"'></thead>"),this._colgroupNode.next());return this._theadNode;}},_createTbodyNode:function(U){this._tbodyNode=U.appendChild(T.create("<tbody class='"+A+"'></tbody>"));return this._tbodyNode;},_createMessageNode:function(U){this._msgNode=U.insertBefore(T.create("<tbody class='"+C+"'></tbody>"),this._tbodyNode);return this._msgNode;},_createCaptionNode:function(U){this._captionNode=U.invoke("createCaption");return this._captionNode;},bindUI:function(){var W=this._theadNode,X=this._tbodyNode,V=this._msgNode,U=this.get("contentBox");this._tableNode.delegate("click",F(this._onTheadClick,this),"thead."+P+">tr>th");this._tableNode.delegate("click",F(this._onTbodyClick,this),"tbody."+A+">tr>td");this._tableNode.delegate("click",F(this._onMsgClick,this),"tbody."+C+">tr>td");},_onTheadFocus:function(){},_onTheadKeydown:function(){},_onTheadClick:function(U){this.fire("theadCellClick",U);this.fire("theadRowClick",U);this.fire("theadClick",U);},_onTbodyFocus:function(){},_onTbodyKeydown:function(){},_onTbodyClick:function(){},_onTableMouseover:function(){},_onTableMouseout:function(){},_onTableMousedown:function(){},_onTableMouseup:function(){},_onTableKeypress:function(){},_onTableFocus:function(){},_onTableDblclick:function(){},_defTheadCellClickFn:function(){},syncUI:function(){this._uiSetStrings(this.get("strings"));this._uiSetColumnset(this.get("columnset"));this._uiSetRecordset(this.get("recordset"));},_afterStringsChange:function(U){this._uiSetStrings(U.newVal);},_uiSetStrings:function(U){this._uiSetSummary(U.summary);this._uiSetCaption(U.caption);},_uiSetSummary:function(U){this._tableNode.set("summary",U);},_uiSetCaption:function(U){this._captionNode.set("innerHTML",U);},_afterColumnsetChange:function(U){this._uiSetColumnset(U.newVal);},_uiSetColumnset:function(Y){var V=Y.get("tree"),W=this._theadNode,Z,X=0,U=V.length;for(;X<U;++X){this.fire("addHeaderTr",{columns:V[X]});}},_defAddHeaderTrFn:function(Z){var X=Z.columns,Y=this._createHeaderTr(X),W=this._theadNode,V=Z.index,U=W.get("children").get("length");if(V===0){Y.addClass(N);}if(V===(U-1)){Y.addClass(K);}W.appendChild(Y);},_createHeaderTr:function(X){var Z=T.create(this._getHeaderTrMarkup(X)),W=0,U=X.length,V=[],Y,a;for(;W<U;++W){Y=X[W];this.fire("addHeaderTh",{column:Y,tr:Z,value:Y.get("label")});}return Z;},_getHeaderTrMarkup:function(U){return B.substitute(this.get("trTemplate"),{});},_defAddHeaderThFn:function(W){var U=W.column,V=W.tr;V.appendChild(T.create(this._getThNodeMarkup({value:W.value},U)));},_getThNodeMarkup:function(V,U){V.column=U;V.id=U.get("id");V.value=B.substitute(this.get("thValueTemplate"),V);V.colspan=U.get("colspan");V.rowspan=U.get("rowspan");return B.substitute(this.thTemplate,V);},_afterRecordsetChange:function(U){this._uiSetRecordset(U.newVal);},_uiSetRecordset:function(W){var Y=this._tbodyNode,X=0,U=3,V;for(;X<U;++X){this.fire("addTr",{record:W.getRecord(X),index:X});}},_defAddTrFn:function(Z){var U=Z.record,V=Z.index,W=this._tbodyNode,Y=W.get("children").item(V)||null,X=W.one("#"+U.get("id"))||this._createBodyTr(U);W.insertBefore(X,Y);return X;},_createBodyTr:function(U){var V=T.create(this._getDataTrMarkup(U));this._createTdNodes(U,V);return V;},_getDataTrMarkup:function(U){return B.substitute(this.get("trTemplate"),{id:U.get("id")});},_createTdNodes:function(V,Z){var W=0,Y=this.get("columnset").get("keys"),U=Y.length,X=[];for(;W<U;++W){X.push(this._getTdNodeMarkup(V,Y[W]));}Z.appendChild(T.create(X.join("")));},_getTdNodeMarkup:function(U,V){var W={};W.headers=V.get("headers");W.value=this.formatDataCell(U,V);return B.substitute(this.tdTemplate,W);},formatDataCell:function(U,V){var W={};W.data=U.get("data");W.value=U.getValue(V.get("key"));return B.substitute(this.get("tdValueTemplate"),W);}});B.namespace("DataTable").Base=S;},"@VERSION@",{lang:["en"],requires:["intl","substitute","widget","recordset"]});