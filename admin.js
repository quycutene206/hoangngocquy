const apiURL =
  "https://67e677bb6530dbd3111020d4.mockapi.io/TourManagement/api/v1/tours";

// Lấy danh sách tour từ API
function fetchTours() {
  $.get(apiURL, function (data) {
    let rows = "";
    data.forEach((tour) => {
      rows += `
                <tr>
                    <td>${tour.id}</td>
                    <td>${tour.name}</td>
                    <td>${tour.price} VND</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editTour(${tour.id}, '${tour.name}', ${tour.price})">Sửa</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteTour(${tour.id})">Xóa</button>
                    </td>
                </tr>`;
    });
    $("#tourTable").html(rows);
  });
}

// Thêm tour mới
$("#addTourForm").submit(function (event) {
  event.preventDefault();
  let newTour = {
    name: $("#tourName").val(),
    price: parseFloat($("#tourPrice").val()),
  };

  $.ajax({
    url: apiURL,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(newTour),
    success: function () {
      $("#addTourModal").modal("hide");
      $("#addTourForm")[0].reset(); // Reset form sau khi thêm
      fetchTours();
    },
    error: function (err) {
      alert("Lỗi khi thêm tour: " + err.responseText);
    },
  });
});

// Hiển thị thông tin tour cần sửa
function editTour(id, name, price) {
  $("#editTourId").val(id);
  $("#editTourName").val(name);
  $("#editTourPrice").val(price);
  $("#editTourModal").modal("show");
}

// Cập nhật tour
$("#editTourForm").submit(function (event) {
  event.preventDefault();
  let updatedTour = {
    name: $("#editTourName").val(),
    price: parseFloat($("#editTourPrice").val()),
  };
  let id = $("#editTourId").val();

  $.ajax({
    url: `${apiURL}/${id}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(updatedTour),
    success: function () {
      $("#editTourModal").modal("hide");
      fetchTours();
    },
    error: function (err) {
      alert("Lỗi khi cập nhật tour: " + err.responseText);
    },
  });
});

// Xóa tour
function deleteTour(id) {
  if (confirm("Bạn có chắc chắn muốn xóa tour này?")) {
    $.ajax({
      url: `${apiURL}/${id}`,
      type: "DELETE",
      success: function () {
        fetchTours();
      },
      error: function (err) {
        alert("Lỗi khi xóa tour: " + err.responseText);
      },
    });
  }
}

// Tải danh sách tour khi trang được load
$(document).ready(function () {
  fetchTours();
});
