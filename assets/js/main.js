/**
* Template Name: Day - v4.7.0
* Template URL: https://bootstrapmade.com/day-multipurpose-html-template-for-free/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

function search() 
 {
     var id= document.getElementById("id1").value;
 
 firebase.database().ref('User/'+ id).once('value').then(function(snapshot) {
                 if (snapshot.exists()) {
                      var name_ = snapshot.val().name;
                      var id_ = snapshot.val().id;
                     var mail_ = snapshot.val().email;
                       document.getElementById("name").value = name_;
                       document.getElementById("id").value = id_;
                       document.getElementById("email").value =  mail_;
                 }
                 else
                 {
 
                 }
         }, function(error) {
             if (error) {
 
             } else {
 
             }
           });
 }
 
 function delete_()
 {
     var del_user = document.getElementById("for_del").value;
     let userRef = firebase.database().ref('User/' + del_user);
     userRef.remove();
     alert("Successfully Removed");
 }
 
      function view2(_n,_e,_m){
      var a=document.getElementById('yo');
      var div=document.createElement('div');

   

    div.style.padding = "10px";
    div.style.margin = "10px";
    div.style.backgroundColor = "rgb(230,2,2)";
    div.style.borderRadius = "2%";

      div.innerHTML = `<h4 style='color: white; font-weight: bolder; "font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;"'>${_n}</h4> <h6 style='color: white; font-size: medium'> ${_m}<br></h6>`
      a.appendChild(div);

      }
      function view(){

        firebase.database().ref('User/').once('value').then(function(snapshot) {
        snapshot.forEach(function(child) {
        var n = child.val().name;
        var e = child.val().email;
        var m = child.val().msg;
        view2(n,e,m);
          

          
        });      
        
                
         }, function(error) {
             if (error) {
 
             } else {
 
             }
           });
 }
      

 
 function show() {
 
     var name = document.getElementById("name").value;
     var email= document.getElementById("email").value;
     var msg= document.getElementById("msg").value;
 
  
      if(name=="" || email==""||msg=="")
      {
        alert('ERROR! Provide all informations');
      }
      else
      {
        firebase.database().ref('User/' + name).set({
          name : name,
          email : email,
          msg : msg
        }, function(error) {
          if (error) {
            // The write failed...
          } else {
            view();
             document.getElementById("name").value="";
             document.getElementById("email").value="";
             document.getElementById("msg").value="";
             alert("Thank you! Your comment has been submitted successfully.");
             location.reload();
             
         
          }
        });
      }
  } 

view();
function shownew() {

  var name = document.getElementById("name").value;
  var email= document.getElementById("email").value;
  var message= document.getElementById("message").value;


   firebase.database().ref('User/' + name).set({
          name : name,
          message : message,
          email : email
        }, function(error) {
          if (error) {
            // The write failed...
          } else {
              alert("Your message has been sent. Thank you!");
            
         
          }
        });
} 

