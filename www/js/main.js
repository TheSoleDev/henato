$(document).ready(function(){

    $.mobile.loading().hide();

    $('#frm-login').on('submit',function(e) {
      e.preventDefault();

      $.ajax({
            url: api_root+"data/submit_login",
            type: "POST",
            dataType: "json",
            data: $('#frm-login').serialize(),
            success: function(data) {
              console.log(data);
               if(data.errors == ''){
                 localStorage.setItem('user_profile',JSON.stringify(data));
                 localStorage.setItem('is_logged',1);
                 $('.register-header-container').hide();
                 $('.login-header-container').hide();
                 
                 $('.welcome-header-container').html('Welcome! '+ data.data.name);
                 $('.welcome-header-container').show();
                 $('.logout-header-container').show();
                 $('.logout-header-container').show();
                 $('.logged').show();
                 $('.not-logged').hide();      

                 if(data.data.role_id == '1'){
                  $('.logged-admin').show();
                 }
                 else{
                  $('.logged-admin').hide();
                 }

                 window.location ="index.html";
                                
               }
               else{
                alert( "Invalid username or password.");
               }
            },
            error: function() {}
        });

    });

    $('#frm-supplier').on('submit',function(e) {
       
        e.preventDefault();
        console.log($('#frm-supplier').serialize());

        $.ajax({
              url: api_root+"data/submit_admin_add_supplier",
              type: "POST",
              dataType: "json",
              data: $('#frm-supplier').serialize(),
              success: function(data) {
                console.log(data);
                 if(data.errors == ''){

                   window.location ="admin-suppliers.html";
                                  
                 }
                 else{
                  alert( "Error in saving. Please try again.");
                 }
              },
              error: function() {}
        });

    });      

    //console.log(localStorage.getItem('user_profile'));
    if(localStorage.getItem('is_logged') == 1){
       var user_profile = JSON.parse(localStorage.getItem('user_profile')); 
       $('.register-header-container').hide();
       $('.login-header-container').hide();
       $('.welcome-header-container').html('Welcome! '+ user_profile.data.name);
       $('.welcome-header-container').show();
       $('.logout-header-container').show();
       $('.logout-header-container').show(); 
       $('.logged').show();
       $('.not-logged').hide();

       if(user_profile.data.role_id == '1'){
        $('.logged-admin').show();
       }
       else{
        $('.logged-admin').hide();
       }       

      $.ajax({
          url: api_root+"data/getCartDetails",
          type: "POST",
          dataType: "json",
          data:"user_id="+user_profile.data.id,
          success: function(data) {
            $('.header-cart-counter').html(data.items_in_cart);

            $('.header-cart-counter').html(data.items_in_cart);
            if(data.items_in_cart > 0 ){
              $('.header-cart-counter').show();
            }
            else{
              $('.header-cart-counter').hide();
            }         
          },
          error: function() {}
      });             
    }
    else{
       $('.logged').hide();
       $('.not-logged').show();      
    }



});

$(document).on("click",".lnk-logout",function(e){
    e.preventDefault();
       localStorage.removeItem('user_profile');
       localStorage.removeItem('is_logged');     
       $('.register-header-container').show();
       $('.login-header-container').show();
       $('.welcome-header-container').html('');
       $('.welcome-header-container').hide();
       $('.logout-header-container').hide();
       $('.logout-header-container').hide(); 
       window.location ="index.html";
})  

var init = {
 data_json: [],
  data : function(){
        var resp_data = $.getJSON(api_root+"data/init").done(function(data){
            localStorage.setItem('init_data',JSON.stringify(data));
            //console.log(data);
        }); 
        return resp_data.responseText;
  },
  home : function(){
    
        var init_data = JSON.parse(localStorage.getItem('init_data'));  

        var arr_str_category = [];
        $.each(init_data.data['category'], function(index, value){

            arr_str_category.push('<a class="grid-cell grid-cell--with-titles" href="category.html?category_slug='+value.slug+'"  data-ajax="false" style="order: 0; width: 107px; height: 147px;">');
                arr_str_category.push('<div class="grid-cell__logo-image" style="background-size: contain; background-image: url(\''+src_url+value.img_path+'\'); background-position: center center; background-repeat: no-repeat; margin: 0px; width: 107px; height: 107px;"></div>');
                arr_str_category.push('<div class="grid-cell__title typo-r12">'+value.name+'</div>');
            arr_str_category.push('</a>');

        });    

        $('.dynamic-category-container').html(arr_str_category.join(''));

        var arr_section = ['todays_sale','recommended_products','featured_products','latest_products','popular_products']

        $.each(arr_section, function(index, value){   
            var arr_str = [];
            $.each(init_data.data[value], function(index, value){              

              var product_name = value.product_name;

              var product_limit_name =product_name.length > 35?product_name.substr(0,35) + '...':product_name;

                  arr_str.push('<div class="col-6 col-md-2 pl-5 pr-5">');
                    arr_str.push('<div class="product-grid-item-group">');
                      arr_str.push('<a class="" href="product.html?product_slug='+value.slug+'" data-ajax="false" title="'+product_name+'">');
                        arr_str.push('<div class="product-img-container">');
                          arr_str.push('<img src="'+src_url+value.primary_img_path+'" class="img-fluid">');
                        arr_str.push('</div>');
                        arr_str.push('<div class="product-details-container">');
                          arr_str.push('<div class="product-title">'+product_limit_name+'</div>');
                          arr_str.push('<div class="row mt-10">');
                            arr_str.push('<div class="col">');
                              arr_str.push('<div class="product-price"><span class="regular-price ">'+value.regular_price+'</span> </div>');
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
        $('.recommended-products-slide').slick({
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
  category : function(){
    
        var url = window.location.search;
        param = url.replace("?", ''); // remove the ?
        let searchParams = new URLSearchParams(param);

        var init_data = JSON.parse(localStorage.getItem('init_data'));  

    
        var resp_data = $.getJSON(api_root+"data/category/"+searchParams.get("category_slug")).done(function(data){
            //localStorage.setItem('init_data',JSON.stringify(data));
            
            console.log(data);
            var data = data.data;
            
            $('.dynamic-current-category').html(data.category_details['name']);

            if(data.category_details['img_banner'] !== null){
                  var arr_str = [];
                  arr_str.push('<div class="row mb-10 mt-30">');
                    arr_str.push('<div class="col">');

                       if(data.category_details['banner_target_url']  !== null){
                          arr_str.push('<a href="'+data.category_details['banner_target_url']+'"><img class="d-block w-100" src="'+src_url+data.category_details['img_banner'] +'"  class="img-fluid"></a>');
                       }
                       else{
                          arr_str.push('<img class="d-block w-100" src="'+src_url+data.category_details['img_banner'] +'"  class="img-fluid">');
                       }
                      

                    arr_str.push('</div>');
                  arr_str.push('</div>');
                  $('.dynamic-banner-container').html(arr_str.join(''));
            }

            var arr_str = [];
            if(data.products.length > 0){

                $.each(data.products, function(index, value){      

                    var product_name = value.product_name;
                    var product_limit_name =product_name.length > 35?product_name.substr(0,35) + '...':product_name;

                    arr_str.push('<div class="col-6 col-md-2 pl-5 pr-5">');
                      arr_str.push('<div class="product-grid-item-group">');
                        arr_str.push('<a class="" href="product.html?product_slug='+value.slug+'" data-ajax="false" title="'+product_name+'">');
                          arr_str.push('<div class="product-img-container">');
                            arr_str.push('<img src="'+src_url+value.primary_img_path+'" class="img-fluid">');
                          arr_str.push('</div>');
                          arr_str.push('<div class="product-details-container">');
                            arr_str.push('<div class="product-title">'+product_limit_name+'</div>');
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
            }
            $('.dynamic-product-container').html(arr_str.join(''));

        }); 

  },
  product : function(){
    
        var url = window.location.search;
        param = url.replace("?", ''); // remove the ?
        let searchParams = new URLSearchParams(param);

        var init_data = JSON.parse(localStorage.getItem('init_data'));  

    
        var resp_data = $.getJSON(api_root+"data/product/"+searchParams.get("product_slug")).done(function(data){

            console.log(data);
            var data = data.data;
            
            //localStorage.setItem('init_data',JSON.stringify(data));
            var product_name = data.product_details.product_name;
            var product_limit_name =product_name.length > 45?product_name.substr(0,45) + '...':product_name;
          
            if(data.product_details.product_banner_img !== null){
                  var arr_str = [];
                  arr_str.push('<div class="row mt-20">');
                    arr_str.push('<div class="col">');

                       if(data.product_details.product_banner_url  !== null){
                          arr_str.push('<a href="'+data.product_details.product_banner_url+'"><img class="d-block w-100" src="'+src_url+data.product_details.product_banner_img +'"  class="img-fluid"></a>');
                       }
                       else{
                          arr_str.push('<img class="d-block w-100" src="'+src_url+data.product_details.product_banner_img +'"  class="img-fluid">');
                       }
                      

                    arr_str.push('</div>');
                  arr_str.push('</div>');
                  $('.dynamic-banner-container').html(arr_str.join(''));
            }          
         
            $('.dynamic-current-product').html(product_limit_name);
            $('.dynamic-product-name').html(data.product_details.product_name);
            $('.dynamic-product_short_description').html(data.product_details.product_short_description);
            $('.dynamic-product-details').html(data.product_details.product_full_description);
            $('#product_id').val(data.product_details.id);
            



            if(data.product_details.sale_type == 'Scheduled' || data.product_details.sale_type == 'Always'){
              $('.dynamic-product-price').html('<span class="regular-price  stroke ">'+data.product_details.regular_price+'</span> <span class="sale-price">'+data.product_details.sale_price+'</span>');
              $('#price').val(data.product_details.regular_price);
            }
            else{
              $('.dynamic-product-price').html('<span class="regular-price">'+data.product_details.regular_price+'</span>');
              $('#price').val(data.product_details.regular_price);
            }

            $('.dynamic-product-primary-image').attr('src',src_url+data.product_details.primary_img_path);
            
            var arr_str = [];

            arr_str.push('<ul class="product-gallery-image ">');
            $.each(JSON.parse(data.product_details.gallery_images), function(index, value){      
                arr_str.push('<li><a href="#" class="small-img" data-src="'+src_url+value+'"><img style="max-width:18%;" class="pt-10" src="'+src_url+value+'"/></a></li>');
            });
            arr_str.push('</ul>');
   
            $('.dynamic-product-gallery-image').html(arr_str.join(''));

            var arr_str = [];
            $.each(data.related_products, function(index, value){      

                var product_name = value.product_name;
                var product_limit_name =product_name.length > 35?product_name.substr(0,35) + '...':product_name;

                arr_str.push('<div class="col-6 col-md-2 pl-5 pr-5">');
                  arr_str.push('<div class="product-grid-item-group">');
                    arr_str.push('<a class="" href="product.html?product_slug='+value.slug+'" data-ajax="false" title="'+product_name+'">');
                      arr_str.push('<div class="product-img-container">');
                        arr_str.push('<img src="'+src_url+value.primary_img_path+'" class="img-fluid">');
                      arr_str.push('</div>');
                      arr_str.push('<div class="product-details-container">');
                        arr_str.push('<div class="product-title">'+product_limit_name+'</div>');
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
            $('.dynamic-recommended-product').html(arr_str.join(''));


            if(localStorage.getItem('is_logged') == 1){
               var user_profile = JSON.parse(localStorage.getItem('user_profile')); 
               $('#user_id').val(user_profile.data.id);
            }

        }); 


  },
  cart : function(){

    if(localStorage.getItem('is_logged') == 1){
       var user_profile = JSON.parse(localStorage.getItem('user_profile')); 

        $.ajax({
            url: api_root+"data/cart",
            type: "GET",
            dataType: "json",
            data:"user_id="+user_profile.data.id,
            success: function(data) {
            console.log(data.data.cart_items);
                var arr_str = [];
                $.each(data.data.cart_items, function(index, value){

                  var product_name = value.product_name;
                  var product_limit_name =product_name.length > 60?product_name.substr(0,60) + '...':product_name;

                  arr_str.push('<div class="row pb-10 pt-10" style="background-color: #ffffff;">');
                      arr_str.push('<div class="col-3"><a class="" href="product.html?product_slug='+value.slug+'" data-ajax="false"><img src="'+src_url+value.primary_img_path+'" alt="..." class="img-fluid"></a></div>');
                      arr_str.push('<div class="col-9">');
                          arr_str.push('<h6 class="nomargin">'+product_limit_name+'</h6>');
                          arr_str.push('<div class="row">');
                              arr_str.push('<div class="col-6">');
                                  arr_str.push('<div><span class="regular-price"><strong>$'+value.cart_price+'</strong></span> x '+value.quantity+'</div>');
                              arr_str.push('</div>');
                              arr_str.push('<div class="col-6 text-right">');
                                arr_str.push('<button class="btn btn-danger btn-sm btnCartItemDelete" title="Delete" data-id="4"><i class="fa fa-trash-o"></i></button>');
                              arr_str.push('</div>');
                          arr_str.push('</div>');
                      arr_str.push('</div>');
                  arr_str.push('</div>');
                  arr_str.push('<hr />');
                });

                $('.dynamic-cart-container').html(arr_str.join(''));
            },
            error: function() {}
        }); 

    }


  },  
  admin_supplier : function(){

    if(localStorage.getItem('is_logged') == 1){
        var user_profile = JSON.parse(localStorage.getItem('user_profile')); 
        var init_data = JSON.parse(localStorage.getItem('init_data'));  

        var arr_supplier = init_data.data['suppliers'];
        var arr_str = [];

        if(arr_supplier.length > 0){


          arr_str.push('<table class="table">');
            arr_str.push('<thead class="thead-light">');
              arr_str.push('<tr>');
                arr_str.push('<th scope="col">Code</th>');
                arr_str.push('<th scope="col">Supplier Name</th>');
                arr_str.push('<th scope="col">Country</th>');
              arr_str.push('</tr>');
            arr_str.push('</thead>');
            arr_str.push('<tbody>');


            $.each(arr_supplier, function(index, value){

              arr_str.push('<tr>');
                arr_str.push('<th scope="row">'+value.supplier_code+'</th>');
                arr_str.push('<td>'+value.supplier_name+'</td>');
                arr_str.push('<td>'+value.country+'</td>');
              arr_str.push('</tr>');

            });

            arr_str.push('</tbody>');
          arr_str.push('</table>');


        } 
        else{
            arr_str.push('<div class="text-center">No supplier found.</div>'); 
        }

        $('.dynamic-supplier-container').html(arr_str.join(''));

    }


  },    
} 

init.data();

