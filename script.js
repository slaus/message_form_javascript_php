window.addEventListener('DOMContentLoaded', function() {

    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами свяжемся.',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
        
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            
            //request.setRequestHeader('Content-type', 'multipart/form-data'); //If not use JSON. Else need to comment this string. For Object with FormData need to comment this string too.
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); //If use JSON. Else need to comment this string.
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 4000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
    
});
