var init = {
 data_json: [],
  data : function(){
        var resp_data = $.getJSON(api_root+"data/init").done(function(data){
            localStorage.setItem('init_data',JSON.stringify(data));
            console.log(data);
        }); 
        return resp_data.responseText;
  },
  home : function(){
    
        var init_data = JSON.parse(localStorage.getItem('init_data'));  

        var arr_str_category = [];
        $.each(init_data.data['category'], function(index, value){

            arr_str_category.push('<a class="grid-cell grid-cell--with-titles" href="category.html?category_id='+value.id+'"  data-ajax="false" style="order: 0; width: 107px; height: 147px;">');
                arr_str_category.push('<div class="grid-cell__logo-image" style="background-size: contain; background-image: url(\''+src_url+value.img_path+'\'); background-position: center center; background-repeat: no-repeat; margin: 0px; width: 107px; height: 107px;"></div>');
                arr_str_category.push('<div class="grid-cell__title typo-r12">'+value.name+'</div>');
            arr_str_category.push('</a>');

        });    

        $('.dynamic-category-container').html(arr_str_category.join(''));



        var arr_section = ['todays_sale','recommended_products','featured_products','latest_products','popular_products']

        $.each(arr_section, function(index, value){   
            console.log(init_data.data[value]);
            var arr_str = [];
            $.each(init_data.data[value], function(index, value){              

                  arr_str.push('<div class="col-6 col-md-2 pl-5 pr-5">');
                    arr_str.push('<div class="product-grid-item-group">');
                      arr_str.push('<a class="" href="product.html?product_id='+value.id+'" data-ajax="false" >');
                        arr_str.push('<div class="product-img-container">');
                          arr_str.push('<img src="'+src_url+value.primary_img_path+'" class="img-fluid">');
                        arr_str.push('</div>');
                        arr_str.push('<div class="product-details-container">');
                          arr_str.push('<div class="product-title">'+value.product_name+'</div>');
                          arr_str.push('<div class="row mt-10">');
                            arr_str.push('<div class="col-8">');
                              arr_str.push('<div class="product-price"><span class="regular-price ">'+value.regular_price+'</span> </div>');
                            arr_str.push('</div>');
                            arr_str.push('<div class="col text-right">');
                              arr_str.push('<div class="free-shipping"><i class="fa fa-truck" aria-hidden="true"></i></div>');
                            arr_str.push('</div>');
                          arr_str.push('</div>');
                        arr_str.push('</div>');                    
                      arr_str.push('</a>');
                    arr_str.push('</div>');
                  arr_str.push('</div>');

            }); 
            $('.dynamic-'+value+'-container').html(arr_str.join(''));
        }); 


        $('.sale-products-slide').slick({
          slidesToShow: 2,
          slidesToScroll: 1
        });         
        $('.featured-products-slide').slick({
          slidesToShow: 2,
          slidesToScroll: 1
        });


        var arr_str = [];
        $.each(init_data.data['brands'], function(index, value){   

                  arr_str.push('<div class="col-6 col-md-2 pl-5 pr-5">');
                    arr_str.push('<div class="product-grid-item-group">');
                          arr_str.push('<a class="" href="#" data-ajax="false" >');
                              arr_str.push('<img src="'+src_url+value.img_path+'" class="img-fluid">');
                          arr_str.push('</a>');
                    arr_str.push('</div>');
                  arr_str.push('</div>');

        }); 
        $('.dynamic-brands-container').html(arr_str.join(''));


        $('.featured-brands-slider').slick({
          slidesToShow: 2,
          slidesToScroll: 1
        });  




        var arr_str = [];
           
        arr_str.push('<div id="homeCarousel" class="carousel slide" data-ride="carousel">');
            arr_str.push('<ol class="carousel-indicators">');
            
            var is_active = 'active';
            var ctr = 0;
            $.each(init_data.data['carousel']['Main Carousel'], function(index, value){                                   
                arr_str.push('<li data-target="#homeCarousel" data-slide-to="'+ctr+'"  class="'+is_active+'" ></li>');
                is_active ='';
                ctr++;
            });

            arr_str.push('</ol>');
            arr_str.push('<div class="carousel-inner">');

                var is_active = 'active';
                $.each(init_data.data['carousel']['Main Carousel'], function(index, value){  
                    arr_str.push('<div class="carousel-item  '+is_active+'">');
                        if(value.target_url != null){
                            arr_str.push('<a href="'+value.target_url +'" data-ajax="false" >');
                                arr_str.push('<img class="d-block w-100" src="'+src_url+value.img_path+'"  class="img-fluid">');
                            arr_str.push('</a>');                            
                        }
                        else{
                            arr_str.push('<img class="d-block w-100" src="'+src_url+value.img_path+'"  class="img-fluid">');
                        }
                    arr_str.push('</div>');
                    is_active ='';
                });

            arr_str.push('</div>');
        arr_str.push('</div>');
         
        $('.dynamic-carousel-container').html(arr_str.join(''));

        $('#homeCarousel').carousel(0);
        $("#homeCarousel").swipe({

          swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

            if (direction == 'left') $(this).carousel('next');
            if (direction == 'right') $(this).carousel('prev');

          },

        });            





  },


} 

init.data();



            // arr_str.push('<div class="col-6 col-md-2 pl-5 pr-5">');
            //     arr_str.push('<div class="product-grid-item-group">');
            //       arr_str.push('<a class="" href="http://henato.eglobalmd.com/product/european-ladise-solid-pu-casual-satchel-shoulder-zipper-bag-dadatop">');
            //         arr_str.push('<div class="product-img-container">');
            //           arr_str.push('<img src="http://henato.eglobalmd.com/storage/products-items/January2018/Ug8nIUqH0VWdUR2zjMhL.jpg" class="img-fluid">');
            //         arr_str.push('</div>');
            //         arr_str.push('<div class="product-details-container">');
            //           arr_str.push('<div class="product-title">European Ladise Solid PU Casual Satchel Shoulder Zipper Bag dadatop</div>');
            //           arr_str.push('<div class="row mt-10">');
            //             arr_str.push('<div class="col-8">');
            //               arr_str.push('<div class="product-price"><span class="regular-price ">$20.75</span> </div>');
            //             arr_str.push('</div>');
            //             arr_str.push('<div class="col text-right">');
            //               arr_str.push('<div class="free-shipping"><i class="fa fa-truck" aria-hidden="true"></i></div>');
            //             arr_str.push('</div>');
            //           arr_str.push('</div>');
            //         arr_str.push('</div>');               
            //       arr_str.push('</a>');
            //     arr_str.push('</div>');
            // arr_str.push('</div>');