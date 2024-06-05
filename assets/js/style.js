/*!
=========================================================
* JohnDoe Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// protfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    });
});



document.getElementById('print').addEventListener('click', function() {
  // Open the PDF in a new tab
  var pdfUrl = 'assets/resume.pdf'; // Replace with the path to your PDF
  var printWindow = window.open(pdfUrl);

  // Wait for the new tab to load the PDF
  printWindow.addEventListener('load', function() {
      printWindow.print();
  }, true);
});


document.getElementById('contact-me-btn').addEventListener('click', function() {
  var phoneNumber = '+201032577986'; 
  var message = 'Hello, I would like to contact you regarding...';
  var url = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
  window.open(url, '_blank');
});

