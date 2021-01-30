/*
 * jQuery Rowspanner Plugin v0.1
 * Copyright 2021 Keng-Wei, Lin
 * Ps.rows should be aggregated if haved same father nodes.  * 
 *  
 */

;( function( $, window, document, undefined ) {

  "use strict";

    var rowspanner = "rowspanner",
      defaults = {
        vertical_align: "top",
        columns: []
      };

    function f ( element, options ) {

      this.element = element;

      this.settings = $.extend( {}, defaults, options );
      this._defaults = defaults;
      this._name = rowspanner;
      this.init();

    }

    $.extend( f.prototype, {
        init: function() {

          var _this = this;
          var $table = $(this.element);
          var arr = [];
		  var rowSpanArr = [];
		  var rowSpanArrForHtml = [];
		  
		  var t = 0
          let f = function(el)
		  {
            $table.find('tr').each(function (r, tr) 
			{				
				var rowArr = [];
				var rowSpanRowArr = [];
				var rowSpanRowArrForHtml = [];
				
				$(this).find(el).each(function (d, el) {					
					if (_this.settings.columns.length === 0 || _this.settings.columns.indexOf(d) !== -1) 
					{
						var $el = $(el);
						var v_dato = $el.html();
						$el.attr('rowspan',1);												
						rowArr[_this.settings.columns.indexOf(d)] = v_dato
						rowSpanRowArr[_this.settings.columns.indexOf(d)] = 0
						rowSpanRowArrForHtml[_this.settings.columns.indexOf(d)] = 0
					}				
				});	

				if(rowArr.length>0) arr.push(rowArr);				 
				if(rowSpanRowArr.length>0) rowSpanArr.push(rowSpanRowArr);	
				if(rowSpanRowArrForHtml.length>0) rowSpanArrForHtml.push(rowSpanRowArrForHtml);		
			});

			if(t === 0)
			{
				// Count Rowspan for each level each category
				var arrCopy = arr
				// loop counter
				var i;var j;var k;var l;var m;
	
				for (i = 0; i < arr.length; i++) 
				{ 
					for (j = 0; j < arrCopy.length; j++) 
					{ 
						for (k = 0; k < _this.settings.columns.length; k++) 
						{
							if( arr[i][k]===arrCopy[j][k] )
							{
								var chkFatherArr = []
								var chkFatherArrCopy = []
								
								for (l = 0; l <= k; l++) 
								{	
									chkFatherArr.push(arr[i][l])
									chkFatherArrCopy.push(arr[j][l])
								}	
								
								if(JSON.stringify(chkFatherArr)==JSON.stringify(chkFatherArrCopy)) rowSpanArr[i][k]+=1;

							}						
						}
					}
				}

				// import Html Using Rowspan Array		
				for (k = 0; k < _this.settings.columns.length; k++) 
				{
					for (m = 0; m < rowSpanArrForHtml.length; m++) 
					{ 
						// Part 1: first row
						if( m === 0 )
						{									
							rowSpanArrForHtml[m][k] = rowSpanArr[m][k];
						}
						// Part 2: first column, second row start
						else if ( m > 0 && k === 0 )
						{
							if(rowSpanArr[m][k] == rowSpanArr[m-1][k])
							{
								rowSpanArrForHtml[m][k] = -1;
							}
							else
							{
								rowSpanArrForHtml[m][k] = rowSpanArr[m][k];
							}
						}
						// Part3: second column, second row start
						else if ( m > 0 && k > 0 )
						{
							var chkFatherArr = []
							var chkFatherArrCopy = []
							
							for (l = 0; l < k; l++) 
							{	
								chkFatherArr.push(rowSpanArr[m][l])
								chkFatherArrCopy.push(rowSpanArr[m-1][l])
							}	
							//console.log(rowSpanArr[m][l],rowSpanArr[m-1][l]);
							if(JSON.stringify(chkFatherArr)===JSON.stringify(chkFatherArrCopy) 
								&& rowSpanArr[m][l] === rowSpanArr[m-1][l] 
							    && arr[m][l] === arr[m-1][l] 
								&& rowSpanArr[m][k] != 1) 
							{									
								rowSpanArrForHtml[m][k]=-1;
							}
							else
							{
								rowSpanArrForHtml[m][k]=rowSpanArr[m][k];
							}
						}	
					}	 					
				}		 
				
				console.log(rowSpanArr);
				console.log(rowSpanArrForHtml);
				t+=1;
			}
			
			var countRow = 0
			$table.find('tr').each(function (r, tr) 
			{		
				$(this).find(el).each(function (d, el) {					
					if (_this.settings.columns.length === 0 || _this.settings.columns.indexOf(d) !== -1) 
					{
						var $el = $(el);
						var v_dato = $el.html();
						//console.log([countRow],[_this.settings.columns.indexOf(d)]);
						if(rowSpanArrForHtml[countRow][_this.settings.columns.indexOf(d)] == -1)
						{
							$el.addClass('rowspan-remove');
						}
						else
						{
							$el.attr('rowspan',rowSpanArrForHtml[countRow][_this.settings.columns.indexOf(d)]);	
						}
					}
					
				});		
				countRow+=1;
			});			
		  
			$('.rowspan-remove').remove();
		  };		  
		  
          f('td');
          f('th');
        }
    } );

    $.fn[ rowspanner ] = function( options ) {
      return this.each( function() {
        if ( !$.data( this, "plugin_" + rowspanner ) ) {
          $.data( this, "plugin_" +
            rowspanner, new f( this, options ) );
        }
      } );
    };

} )( jQuery, window, document );