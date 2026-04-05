let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slidegw");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000); // Gambar ganti setiap 4 detik
}

// 2. Logika Popup Modal
function openModal(src) {
  document.getElementById("modalgw").style.display = "block";
  document.getElementById("img01").src = src;
}

function closeModal() {
  document.getElementById("modalgw").style.display = "none";
}

const form = document.getElementById("registrationForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.querySelectorAll("input")[0].value;
    const program = form.querySelector("select").value;

    const waNumber = "6285250878278";
    const text = `Halo Admin TOGA! Nama saya ${name}. Saya ingin mendaftar program ${program}. Mohon info selanjutnya ya!`;

    // Saat tombol kirim diklik
    document.getElementById("formContent").style.display = "none";
    document.getElementById("successMessage").style.display = "block";

    const waURL = `https://api.whatsapp.com/send?phone=${waNumber}&text=${text}`;
    setTimeout(() => {
      window.open(waURL, "_blank");
    }, 1000);
  });
}
