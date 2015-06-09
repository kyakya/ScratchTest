(function () {
    var takePicture = document.querySelector("#take-picture"),
        showPicture = document.querySelector("#show-picture");
 
    if (takePicture &amp;&amp; showPicture) {
        // �̺�Ʈ ����
        takePicture.onchange = function (event) {
            // ���� �����̳� ���Ͽ� ���� ���� ���
            var files = event.target.files,
                file;
            if (files && files.length > 0) {
                file = files[0];
                try {
                    // window.URL ��ü ���
                    var URL = window.URL || window.webkitURL;
 
                    // ObjectURL ����
                    var imgURL = URL.createObjectURL(file);
 
                    // src�� ObjectURL ����
                    showPicture.src = imgURL;
 
                    // Revoke ObjectURL
                    URL.revokeObjectURL(imgURL);
                }
                catch (e) {
                    try {
                        // createObjectURL�� �������� �ʴ� ��� ���
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        //
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }
            }
        };
    }
})();