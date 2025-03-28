$(document).ready(function () {
  const apiUrl =
    "https://67e677bb6530dbd3111020d4.mockapi.io/TourManagement/api/v1/tours"; // Thay bằng API thật của bạn

  // Lấy danh sách tour từ API
  $.getJSON(apiUrl, function (data) {
    let html = "";
    data.forEach((tour) => {
      html += `<div class="col-md-4 mb-3">
                        <div class="card">
                            <img src="${tour.image}" class="card-img-top" alt="${tour.name}">
                            <div class="card-body">
                                <h5 class="card-title">${tour.name}</h5>
                                <p class="card-text">${tour.description}</p>
                                <p class="card-text"><strong>Giá:</strong> ${tour.price} VNĐ</p>
                                <button class="btn btn-primary book-tour" data-id="${tour.id}">Đặt Tour</button>
                            </div>
                        </div>
                    </div>`;
    });
    $("#tour-list").html(html);
  });

  // Hiển thị modal đặt tour khi nhấn nút "Đặt Tour"
  $(document).on("click", ".book-tour", function () {
    let tourId = $(this).data("id");
    $("#selectedTourId").val(tourId);
    $("#bookingModal").modal("show");
  });

  // Xử lý form đặt tour
  $("#bookingForm").submit(function (event) {
    event.preventDefault();
    const bookingData = {
      name: $("#name").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      tourId: $("#selectedTourId").val(),
    };

    console.log("Đặt tour thành công:", bookingData);
    alert("Đặt tour thành công!");
    $("#bookingModal").modal("hide");
  });
});
