 $(function () {
        $('#contact-form').submit(function (e) {
            e.preventDefault();
            var errors = 0;
            $("input, textarea").change(function () {
                var value = this.value;
                if (value === "") {
                    errors += 1;
                    $(this).css("border", "1px solid red");
                    $('#error').show();
                                
                }
                else {
                    $(this).css("border", "1px solid #ccc");
                }
            }).trigger("change");
            if (errors === 0) {
                var that = this;
                $('.this-hide').fadeOut(500);
                $('#detailsSuccess').fadeIn(500);
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: $('#contact-form').attr('action'),
                    data: {
                        name: $('#contact-form #name').val(),
                        phone: $('#contact-form #phone').val(),
                        email: $('#contact-form #email').val(),
                        message: $('#contact-form #message').val()
                    },

                    success: function (data) {
                        if (data.status === "") {
                            console.log('The enquiry was not sent');
                        } else {
                            var message = 'Thank you, your enquiry has been sent.';
                            console.log(message);
                           
                        }

                    }
                });
            }

        });

    });