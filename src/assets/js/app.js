import $ from 'jquery';
import '../../../node_modules/slick-slider/slick/slick';
import 'what-input';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import initialProducts from '../../data/initial.json';
import products from '../../data/products.json';

$(window).on('load', () => {
    const burgerIcon = document.querySelector('.header__burger-icon'); 
    const menuItem = document.querySelector('.header__burger-navbar');
    const body = document.querySelector('body');

    $(".header__burger").on("click", () => {
        menuItem.classList.toggle('header__burger-navbar--active');
        burgerIcon.classList.toggle('header__burger-icon--active')
        body.classList.toggle('body-hidden')
    });

    $('.banner__arrow').on("click", () => {
		$('html, body').animate({scrollTop: $(document).height() - $(window).height()}, 800);
	});

    $('.loadMore__button').on("click", () => {
        const countShowProducts = $('.productCard').length;
        const countLoadProducts = countShowProducts - initialProducts.length;
        let numberLastProduct = countLoadProducts + 9;
        const leftShowProduct = products.length - countLoadProducts;
        let counter = 0;

        if (leftShowProduct < 9) {
            numberLastProduct = products.length - countLoadProducts + countLoadProducts;
        }

        for ( let i = countLoadProducts; i < numberLastProduct; i++ ) {
            counter++;
            const product = $('<a></a>');
            const image = $("<img />");
            if ( counter == 7) {
                product.attr('class', 'productCard productCard--big')
            }
            else {
                product.attr('class', 'productCard');
            }
            image.attr('class', 'productCard__image');
            image.attr('alt', 'product');
            image.attr('src', `${products[i].mainImage}`);
            product.append(image);
            product.attr('href', 'product.html');
            product.append($(`<p class="productCard__product font-weight-500">${products[i].name}</p>`));
            product.append($(`<p productCard__price font-weight-700>${products[i].price}</p>`));
            product.appendTo($('.collection__content'));
        }

        updateLoadMore();
    });

    updateLoadMore();

    $('.productSlider__main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '#scroll-left',
        nextArrow: '#scroll-right',
        fade: true,
        asNavFor: '.productSlider__small',
    });

    $('.productSlider__small').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.productSlider__main',
        dots: false,
        arrows: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 896,
                settings: {
                    rows: 2,
                    slidesToShow: 2,
                }
            },
        ]
    });
    
});

const updateLoadMore = () => {
    const countAllProducts = initialProducts.length + products.length;
    const countShowProducts = $('.productCard').length;
    const interestShowProducts =  100 * countShowProducts / countAllProducts;
    const countLoadProducts = countShowProducts - initialProducts.length;
        if ( countLoadProducts >= products.length) {
            $('.loadMore__button').prop('disabled', true);
        }
    $('.loadMore__title').html(`Showing ${countShowProducts} of ${countAllProducts} items`)
    $('.loadMore__progress-meter').css('width', `${interestShowProducts}%`);
}

$(document).foundation();
