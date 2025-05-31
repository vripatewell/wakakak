document.addEventListener('DOMContentLoaded', () => {
// === Global Variables & Constants ===
const tahunSekarangElement = document.getElementById('tahun-sekarang');
const NOMOR_WHATSAPP_TOKO = '6285771555374'; // GANTI DENGAN NOMOR ANDA!

const headerCartIcon = document.getElementById('headerCartIcon');
const headerCartItemCount = document.getElementById('headerCartItemCount');

const detailModal = document.getElementById('detail-modal');
const closeModalBtn = detailModal.querySelector('.close-btn'); 
const modalNamaProdukHeader = document.getElementById('modal-nama-produk-header');
const modalImg = document.getElementById('modal-img');
const modalHargaSpan = detailModal.querySelector('#harga-modal-default #modal-harga');
const modalDeskripsi = document.getElementById('modal-deskripsi');
const modalVariantsContainer = document.getElementById('modal-variants-container');
const modalBeliWhatsAppBtn = document.getElementById('modal-beli-whatsapp-btn');
const modalCaraBayarBtn = document.getElementById('modal-cara-bayar-btn');
const modalTambahKeranjangBtn = document.getElementById('modal-tambah-keranjang-btn');

const paymentInfoPopup = document.getElementById('payment-info-popup');
const closePaymentInfoPopupBtn = paymentInfoPopup.querySelector('.close-btn');

const bannerSlides = document.getElementById('bannerSlides');
const bannerDotsContainer = document.getElementById('bannerDots');
const prevBannerBtn = document.getElementById('prevBanner');
const nextBannerBtn = document.getElementById('nextBanner');
let currentBannerIndex = 0; let bannerInterval;
const bannerSlideElements = bannerSlides ? bannerSlides.children : [];

const hamburgerBtn = document.getElementById('hamburgerBtn');
const sideNav = document.getElementById('sideNav');
const closeSidenavBtn = document.getElementById('closeSidenavBtn');
const pageOverlay = document.getElementById('page-overlay');
const menuBeranda = document.getElementById('menuBeranda');
const menuTentangKami = document.getElementById('menuTentangKami');
const menuChatAI = document.getElementById('menuChatAI');
const menuChatSeller = document.getElementById('menuChatSeller');

const tentangKamiModal = document.getElementById('tentangKamiModal');
const closeTentangKamiModalBtn = tentangKamiModal.querySelector('.close-btn');

const cartModal = document.getElementById('cartModal');
const closeCartModalBtn = cartModal.querySelector('.close-btn');
const cartModalItemContainer = document.getElementById('cartModalItemContainer');
const cartModalTotalHarga = document.getElementById('cartModalTotalHarga');
const cartModalCheckoutBtn = document.getElementById('cartModalCheckoutBtn');

const chatAiModal = document.getElementById('chatAiModal');
const closeChatAiModalBtn = chatAiModal.querySelector('.close-btn');
const chatAiMessages = document.getElementById('chatAiMessages');
const chatAiInput = document.getElementById('chatAiInput');
const sendChatAiBtn = document.getElementById('sendChatAiBtn');
const chatAiLoading = document.getElementById('chatAiLoading');
let chatHistoryAI = []; 


const kategoriNavContainer = document.getElementById('kategoriNav');
const kategoriSlidesWrapper = document.getElementById('kategoriSlidesWrapper');
const kategoriSlidesContainer = document.getElementById('kategori-slides');
let currentKategoriIndex = 0; let semuaKategoriUnik = [];
let kategoriTabs = []; let kategoriSlideDOMElements = []; 
let touchStartX = 0; let touchEndX = 0; let touchStartY = 0;
let isSwipingKategori = false;

/* Produk panel */
const daftarProduk = [
{ id: 1, nama: 'Panel Ram 1gb', harga: 3000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 4000 } },

{ id: 2, nama: 'Panel Ram 2gb', harga: 4000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 5000 } },

{ id: 3, nama: 'Panel Ram 3gb', harga: 5000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 6000 } },

{ id: 4, nama: 'Panel Ram 4gb', harga: 6000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 7000 } },

{ id: 5, nama: 'Panel Ram 5gb', harga: 7000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 8000 } },

{ id: 6, nama: 'Panel Ram 6gb', harga: 8000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 9000 } },

{ id: 7, nama: 'Panel Ram 7gb', harga: 9000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 10000 } },

{ id: 8, nama: 'Panel Ram 8gb', harga: 10000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 11000 } },

{ id: 9, nama: 'Panel Ram 9gb', harga: 11000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 12000 } },

{ id: 10, nama: 'Panel Ram 10gb', harga: 12000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 13000 } },

{ id: 11, nama: 'Panel Ram 11gb', harga: 13000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 14000 } },

{ id: 12, nama: 'Panel Ram unli', harga: 15000, gambar: 'image/panel.jpg', kategori: 'Panel Petrodactyl', deskripsiSingkat: `Server aman anti colong sc`, deskripsiPanjang: `Syarat & Ketentuan : Server private & kualitas terbaik! | Script bot dijamin aman (anti drama/maling) | masa aktif panel 30 hari | Garansi 10 hari (1x replace) | Server anti delay/lemot! | Claim garansi wajib bawa bukti transaksi dan data panel yang lengkap`, meta: { rating: 5.0, terjual: '5rb+', lokasi: 'Kab. Bogor', hargaAsli: 16000 } },

/* Produk Vps */
{ id: 13, nama: 'VPS Ram:1 Cpu:1', harga: 20000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'Vps Digital Ochean', deskripsiPanjang: 'Bonus Buy Vps: Free Install Panel 1x ram 8/16 || Free Instal Wings/Node 1x ram 8/16 || Free Pasang Egg Bot/Mc || Free Install Thema Buy Ram 8/16 || Garansi 15 Hari Nego? = Nogar || Vps On 30 Hari || Garansi Hanya 1x Ambil', meta: { rating: 4.9, terjual: '2rb+', lokasi: 'Kota bogor' } },

{ id: 14, nama: 'VPS Ram:2 Cpu:1', harga: 25000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'VPS handal untuk server Anda.', deskripsiPanjang: 'Bonus Buy Vps: Free Install Panel 1x ram 8/16 || Free Instal Wings/Node 1x ram 8/16 || Free Pasang Egg Bot/Mc || Free Install Thema Buy Ram 8/16 || Garansi 15 Hari Nego? = Nogar || Vps On 30 Hari || Garansi Hanya 1x Ambil', meta: { rating: 4.9, terjual: '2rb+', lokasi: 'Kota bogor' } },

{ id: 15, nama: 'VPS Ram:2 Cpu:2', harga: 30000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'VPS handal untuk server Anda.', deskripsiPanjang: 'Bonus Buy Vps: Free Install Panel 1x ram 8/16 || Free Instal Wings/Node 1x ram 8/16 || Free Pasang Egg Bot/Mc || Free Install Thema Buy Ram 8/16 || Garansi 15 Hari Nego? = Nogar || Vps On 30 Hari || Garansi Hanya 1x Ambil', meta: { rating: 4.9, terjual: '2rb+', lokasi: 'Kota bogor' } },

{ id: 16, nama: 'VPS Ram:4 Cpu:2', harga: 40000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'VPS handal untuk server Anda.', deskripsiPanjang: 'Bonus Buy Vps: Free Install Panel 1x ram 8/16 || Free Instal Wings/Node 1x ram 8/16 || Free Pasang Egg Bot/Mc || Free Install Thema Buy Ram 8/16 || Garansi 15 Hari Nego? = Nogar || Vps On 30 Hari || Garansi Hanya 1x Ambil', meta: { rating: 4.9, terjual: '2rb+', lokasi: 'Kota bogor' } },

{ id: 17, nama: 'VPS Ram:8 Cpu:4', harga: 50000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'VPS handal untuk server Anda.', deskripsiPanjang: 'Bonus Buy Vps: Free Install Panel 1x ram 8/16 || Free Instal Wings/Node 1x ram 8/16 || Free Pasang Egg Bot/Mc || Free Install Thema Buy Ram 8/16 || Garansi 15 Hari Nego? = Nogar || Vps On 30 Hari || Garansi Hanya 1x Ambil', meta: { rating: 4.9, terjual: '2rb+', lokasi: 'Kota bogor' } },

{ id: 18, nama: 'VPS Ram:16 Cpu:4', harga: 70000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'VPS handal untuk server Anda.', deskripsiPanjang: 'Bonus Buy Vps: Free Install Panel 1x ram 8/16 || Free Instal Wings/Node 1x ram 8/16 || Free Pasang Egg Bot/Mc || Free Install Thema Buy Ram 8/16 || Garansi 15 Hari Nego? = Nogar || Vps On 30 Hari || Garansi Hanya 1x Ambil', meta: { rating: 4.9, terjual: '2rb+', lokasi: 'Kota bogor' } },

{ id: 19, nama: 'VPS Ram:16 Cpu:8', harga: 80000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'VPS handal untuk server Anda.', deskripsiPanjang: 'Bonus Buy Vps: Free Install Panel 1x ram 8/16 || Free Instal Wings/Node 1x ram 8/16 || Free Pasang Egg Bot/Mc || Free Install Thema Buy Ram 8/16 || Garansi 15 Hari Nego? = Nogar || Vps On 30 Hari || Garansi Hanya 1x Ambil', meta: { rating: 4.9, terjual: '2rb+', lokasi: 'Kota bogor' } },

{ id: 20, nama: 'VPS Ram:32 Cpu:8', harga: 90000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'VPS handal untuk server Anda.', deskripsiPanjang: 'Bonus Buy Vps: Free Install Panel 1x ram 8/16 || Free Instal Wings/Node 1x ram 8/16 || Free Pasang Egg Bot/Mc || Free Install Thema Buy Ram 8/16 || Garansi 15 Hari Nego? = Nogar || Vps On 30 Hari || Garansi Hanya 1x Ambil', meta: { rating: 4.9, terjual: '2rb+', lokasi: 'Kota bogor' } },

{ id: 21, nama: 'Digital Ochean 10drop paypal', harga: 190000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'VPS handal untuk server Anda.', deskripsiPanjang: 'Virtual Private Server Linux...', meta: { rating: 4.9, terjual: '2rb+', lokasi: 'Kota bogor' } },

{ id: 22, nama: 'Digital Ochean 3drop paypal', harga: 135000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'VPS handal untuk server Anda.', deskripsiPanjang: 'Virtual Private Server Linux...', meta: { rating: 4.9, terjual: '2rb+', lokasi: 'Kota bogor' } },

{ id: 23, nama: 'Digital Ochean 3drop vcc', harga: 120000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'VPS handal untuk server Anda.', deskripsiPanjang: 'Virtual Private Server Linux...', meta: { rating: 4.9, terjual: '1,5rb+', lokasi: 'Kota bogor' } },

{ id: 24, nama: 'Digital Ochean 10drop vcc', harga: 150000, gambar: 'image/vps.jpg', kategori: 'Vps Digital Ochean', deskripsiSingkat: 'VPS handal untuk server Anda.', deskripsiPanjang: 'Virtual Private Server Linux...', meta: { rating: 4.9, terjual: '1,5rb+', lokasi: 'Kota bogor' } },
/* BOT pushkontak */
{ id: 25, nama: 'Bot pushkontak 1 day', harga: 5000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

{ id: 26, nama: 'Bot pushkontak 5 day', harga: 10000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

{ id: 27, nama: 'Bot pushkontak 7 day', harga: 15000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

{ id: 28, nama: 'Bot pushkontak 10 day', harga: 20000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

{ id: 29, nama: 'Bot pushkontak 15 day', harga: 25000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

{ id: 30, nama: 'Bot pushkontak 20 day', harga: 30000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

{ id: 31, nama: 'Bot pushkontak 25 day', harga: 35000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

{ id: 32, nama: 'Bot pushkontak 30 day', harga: 40000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

{ id: 33, nama: 'Bot jaga grup 7 day', harga: 15000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

{ id: 34, nama: 'Bot jaga grup 15 day', harga: 25000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

{ id: 35, nama: 'Bot jaga grup 20 day', harga: 30000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

{ id: 36, nama: 'Bot jaga grup 30 day', harga: 40000, gambar: 'image/bot.jpg', kategori: 'Sewa Bot', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Spesifikasi 💾 || ▪︎ bot tinggal pasang saja tidak ribet || ▪︎ buy bakal di ajarkan sampai bisa || ▪︎ bot sudah di lengkapi garansi || ▪︎ setiap harga bot garansi berbeda beda || ▪︎ gas order sekarang juga dengan cara hubungi owner', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota bogor' } },

/*{ id: 9, nama: 'Script Toko Online Pro', harga: 350000, gambar: 'images/script_toko.jpg', kategori: 'Script', deskripsiSingkat: 'Script e-commerce siap pakai.', deskripsiPanjang: 'Script toko online profesional...', meta: { rating: 5.0, terjual: '100+', lokasi: 'Kota Yogyakarta' } },*/
];
let keranjang = JSON.parse(localStorage.getItem('tokoEstetikV9')) || [];


function formatRupiah(angka) { return angka.toLocaleString('id-ID'); }

function checkAndSetBodyOverlay() {
const isAnyModalOrSidenavOpen = 
(detailModal && detailModal.style.display === 'block') ||
(paymentInfoPopup && paymentInfoPopup.style.display === 'block') ||
(tentangKamiModal && tentangKamiModal.style.display === 'block') ||
(cartModal && cartModal.style.display === 'block') ||
(chatAiModal && chatAiModal.style.display === 'block') ||
(sideNav && sideNav.style.width !== "0px" && sideNav.style.width !== "");

if (isAnyModalOrSidenavOpen) {
document.body.classList.add('body-overlay-active');
if (pageOverlay && sideNav && sideNav.style.width !== "0px" && sideNav.style.width !== "") {
pageOverlay.classList.add('active');
} else if (pageOverlay) {
pageOverlay.classList.remove('active');
}
} else {
document.body.classList.remove('body-overlay-active');
if (pageOverlay) pageOverlay.classList.remove('active');
}
}

// Sidenav Logic
function openSidenav() { if (sideNav) sideNav.style.width = getComputedStyle(document.documentElement).getPropertyValue('--sidenav-width').trim() || "280px"; checkAndSetBodyOverlay(); }
function closeSidenav() { if (sideNav) sideNav.style.width = "0"; checkAndSetBodyOverlay(); }
if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSidenav);
if (closeSidenavBtn) closeSidenavBtn.addEventListener('click', closeSidenav);
if (pageOverlay) pageOverlay.addEventListener('click', closeSidenav);

if (menuBeranda) { menuBeranda.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeSidenav(); }); }
if (menuTentangKami && tentangKamiModal && closeTentangKamiModalBtn) {
menuTentangKami.addEventListener('click', () => { tentangKamiModal.style.display = 'block'; closeSidenav(); checkAndSetBodyOverlay(); });
closeTentangKamiModalBtn.addEventListener('click', () => { tentangKamiModal.style.display = 'none'; checkAndSetBodyOverlay(); });
}
if (menuChatAI && chatAiModal && closeChatAiModalBtn) {
menuChatAI.addEventListener('click', () => { chatAiModal.style.display = 'block'; closeSidenav(); checkAndSetBodyOverlay(); });
closeChatAiModalBtn.addEventListener('click', () => { chatAiModal.style.display = 'none'; checkAndSetBodyOverlay(); });
}
if (sendChatAiBtn && chatAiInput && chatAiMessages) {
sendChatAiBtn.addEventListener('click', handleSendChatMessage);
chatAiInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendChatMessage(); } });
chatAiInput.addEventListener('input', () => {
chatAiInput.style.height = 'auto';
chatAiInput.style.height = (chatAiInput.scrollHeight) + 'px';
});
}
if (menuChatSeller) { menuChatSeller.addEventListener('click', () => { window.open(`https://api.whatsapp.com/send?phone=${NOMOR_WHATSAPP_TOKO}&text=${encodeURIComponent("Halo Seller, saya ingin bertanya...")}`, '_blank'); closeSidenav(); }); }

if (headerCartIcon && cartModal && closeCartModalBtn) {
headerCartIcon.addEventListener('click', () => { renderKeranjang(); cartModal.style.display = 'block'; checkAndSetBodyOverlay(); });
closeCartModalBtn.addEventListener('click', () => { cartModal.style.display = 'none'; checkAndSetBodyOverlay(); });
}

// Banner Logic
function createBannerDots() { if (!bannerSlideElements || bannerSlideElements.length === 0 || !bannerDotsContainer) return; bannerDotsContainer.innerHTML = ''; for (let i = 0; i < bannerSlideElements.length; i++) { const dot = document.createElement('button'); dot.classList.add('banner-dot'); dot.setAttribute('aria-label', `Go to slide ${i + 1}`); dot.addEventListener('click', () => { currentBannerIndex = i; showBannerSlide(); resetBannerInterval(); }); bannerDotsContainer.appendChild(dot); } updateBannerDots(); }
function updateBannerDots() { if (!bannerDotsContainer || !bannerDotsContainer.children || bannerDotsContainer.children.length === 0) return; Array.from(bannerDotsContainer.children).forEach((dot, index) => dot.classList.toggle('active', index === currentBannerIndex)); }
function showBannerSlide() { if (!bannerSlides || !bannerSlideElements || bannerSlideElements.length === 0) return; const offset = -currentBannerIndex * 100; bannerSlides.style.transform = `translateX(${offset}%)`; updateBannerDots(); }
function nextBanner() { if (!bannerSlideElements || bannerSlideElements.length === 0) return; currentBannerIndex = (currentBannerIndex + 1) % bannerSlideElements.length; showBannerSlide(); }
function prevBanner() { if (!bannerSlideElements || bannerSlideElements.length === 0) return; currentBannerIndex = (currentBannerIndex - 1 + bannerSlideElements.length) % bannerSlideElements.length; showBannerSlide(); }
function startBannerInterval() { if (!bannerSlideElements || bannerSlideElements.length <= 1) return; bannerInterval = setInterval(nextBanner, 5000); }
function resetBannerInterval() { clearInterval(bannerInterval); startBannerInterval(); }
if (prevBannerBtn && nextBannerBtn && bannerSlides) { prevBannerBtn.addEventListener('click', () => { prevBanner(); resetBannerInterval(); }); nextBannerBtn.addEventListener('click', () => { nextBanner(); resetBannerInterval(); }); }

// Kategori Slider Logic
function setupKategoriSlider() {
if (!kategoriNavContainer || !kategoriSlidesContainer) return;
semuaKategoriUnik = [...new Set(daftarProduk.map(p => p.kategori).filter(Boolean))];
kategoriNavContainer.innerHTML = ''; kategoriSlidesContainer.innerHTML = '';
kategoriTabs = []; kategoriSlideDOMElements = [];
semuaKategoriUnik.forEach((kategori, index) => {
const tab = document.createElement('button'); tab.classList.add('kategori-tab'); tab.textContent = kategori; tab.dataset.index = index;
tab.addEventListener('click', () => { showKategoriSlide(index); });
kategoriNavContainer.appendChild(tab); kategoriTabs.push(tab);
const slide = document.createElement('div'); slide.classList.add('kategori-slide'); slide.dataset.kategori = kategori;
kategoriSlidesContainer.appendChild(slide);
const produkKategoriIni = daftarProduk.filter(p => p.kategori === kategori);
renderProdukDiSlide(produkKategoriIni, slide);
});
kategoriSlideDOMElements = Array.from(kategoriSlidesContainer.children);
if (kategoriTabs.length > 0) showKategoriSlide(0);
if(kategoriSlidesWrapper) {
kategoriSlidesWrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
kategoriSlidesWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
kategoriSlidesWrapper.addEventListener('touchend', handleTouchEnd);
}
}
function renderProdukDiSlide(produkList, slideElement) {
slideElement.innerHTML = '';
if (produkList.length === 0) { slideElement.innerHTML = "<p class='no-produk-msg'>Tidak ada produk dalam kategori ini.</p>"; return; }
produkList.forEach(produk => {
const produkDiv = document.createElement('div'); produkDiv.classList.add('produk-item');
let hargaDisplay = produk.isVariantProduct && produk.variants && produk.variants.length > 0 
? `Mulai Rp ${formatRupiah(produk.variants[0].harga)}` 
: (typeof produk.harga !== 'undefined' ? `Rp ${formatRupiah(produk.harga)}` : 'Lihat Detail');
const meta = produk.meta || {};
produkDiv.innerHTML = `
<div class="produk-gambar-container"><img src="${produk.gambar}" alt="${produk.nama}" onerror="this.onerror=null;this.src='images/placeholder.jpg';this.alt='Gambar tidak tersedia';"></div>
<div class="produk-item-info">
<h3>${produk.nama}</h3>
<p class="harga">${hargaDisplay} ${meta.hargaAsli ? `<span class="harga-asli">Rp ${formatRupiah(meta.hargaAsli)}</span>` : ''}</p>
<div class="produk-item-meta">
${meta.rating ? `<span class="rating"><span>⭐</span> ${meta.rating.toFixed(1)}</span>` : ''}
${meta.terjual ? `<span class="terjual">| ${meta.terjual} terjual</span>` : ''}
${meta.lokasi ? `<span class="lokasi" style="display:block; width:100%; margin-top:4px;">📍 ${meta.lokasi}</span>` : ''}
</div>
</div>
<div class="tombol-produk">
<button class="detail-btn" data-id="${produk.id}">Detail</button>
${!produk.isVariantProduct && typeof produk.harga !== 'undefined' ? `<button class="tambah-keranjang-btn" data-id="${produk.id}">+ Keranjang</button>` : ''}
</div>`;
slideElement.appendChild(produkDiv);
});
}
if (kategoriSlidesContainer) {
kategoriSlidesContainer.addEventListener('click', (e) => {
const target = e.target.closest('button'); if (!target) return;
const id = parseInt(target.dataset.id); if (isNaN(id)) return;
const produkTerpilih = daftarProduk.find(p => p.id === id);
if (target.classList.contains('detail-btn')) bukaModalDetail(id);
else if (target.classList.contains('tambah-keranjang-btn')) {
if (produkTerpilih && !produkTerpilih.isVariantProduct && typeof produkTerpilih.harga !== 'undefined') {
tambahKeKeranjang(produkTerpilih.id, null, produkTerpilih.nama, produkTerpilih.harga);
target.textContent = '✓'; target.style.backgroundColor = 'var(--success-color)'; target.style.color = 'white';
setTimeout(() => { target.textContent = '+ Keranjang'; target.style.backgroundColor = 'var(--primary-color)'; }, 1500);
}
}
});
}
function showKategoriSlide(index = currentKategoriIndex) {
if (!kategoriSlidesContainer || !kategoriSlideDOMElements || kategoriSlideDOMElements.length === 0) return;
if (index < 0 || index >= kategoriSlideDOMElements.length) index = 0; 
currentKategoriIndex = index;
const offset = -currentKategoriIndex * 100;
kategoriSlidesContainer.style.transform = `translateX(${offset}%)`;
kategoriTabs.forEach((tab, i) => tab.classList.toggle('active', i === currentKategoriIndex));
if (kategoriTabs[currentKategoriIndex] && typeof kategoriTabs[currentKategoriIndex].scrollIntoView === 'function') {
 kategoriTabs[currentKategoriIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}
}
function nextKategoriSlide() { if (!kategoriSlideDOMElements || kategoriSlideDOMElements.length === 0) return; currentKategoriIndex = (currentKategoriIndex + 1) % kategoriSlideDOMElements.length; showKategoriSlide(); }
function prevKategoriSlide() { if (!kategoriSlideDOMElements || kategoriSlideDOMElements.length === 0) return; currentKategoriIndex = (currentKategoriIndex - 1 + kategoriSlideDOMElements.length) % kategoriSlideDOMElements.length; showKategoriSlide(); }
function handleTouchStart(evt) { touchStartX = evt.touches[0].clientX; touchStartY = evt.touches[0].clientY; isSwipingKategori = false; touchEndX = touchStartX; }
function handleTouchMove(evt) {
if (!touchStartX || !touchStartY) return;
touchEndX = evt.touches[0].clientX; let currentY = evt.touches[0].clientY;
let diffXAbs = Math.abs(touchStartX - touchEndX); let diffYAbs = Math.abs(touchStartY - currentY);
if (diffXAbs > 15 && diffXAbs > diffYAbs * 1.5) { isSwipingKategori = true; evt.preventDefault(); }
}
function handleTouchEnd() {
if (!isSwipingKategori || !kategoriSlideDOMElements || kategoriSlideDOMElements.length <= 1) { isSwipingKategori = false; touchStartX = 0; touchStartY = 0; touchEndX = 0; return; }
const diffX = touchStartX - touchEndX; const swipeThreshold = 50; 
if (diffX > swipeThreshold) nextKategoriSlide();
else if (diffX < -swipeThreshold) prevKategoriSlide();
touchStartX = 0; touchStartY = 0; touchEndX = 0; isSwipingKategori = false;
}

// Detail Modal Logic
function bukaModalDetail(idProduk) {
if (!detailModal || !modalImg || !modalNamaProdukHeader || !modalDeskripsi || !modalVariantsContainer) return;
const produk = daftarProduk.find(p => p.id === idProduk); if (!produk) return;
modalImg.src = produk.gambar; modalImg.alt = produk.nama;
modalNamaProdukHeader.textContent = produk.nama; 
modalDeskripsi.textContent = produk.deskripsiPanjang || 'Tidak ada deskripsi tambahan.';
modalVariantsContainer.innerHTML = '';
detailModal.classList.remove('modal-has-variants', 'modal-no-variants');

if (produk.isVariantProduct && produk.variants && produk.variants.length > 0) {
detailModal.classList.add('modal-has-variants');
produk.variants.forEach((variant, index) => {
const variantDiv = document.createElement('div'); variantDiv.classList.add('variant-item');
variantDiv.innerHTML = `
<div class="variant-info-display">
<span class="variant-number">${index + 1}.</span> <span class="nama-variant">${variant.nama_variant}</span> = 
<span class="harga-variant-display">Rp ${formatRupiah(variant.harga)}</span>
</div>
<button class="tambah-variant-btn" data-product-id="${produk.id}" data-variant-id="${variant.id_variant}">Tambah</button>`;
modalVariantsContainer.appendChild(variantDiv);
});
modalVariantsContainer.querySelectorAll('.tambah-variant-btn').forEach(button => {
button.addEventListener('click', function() {
const prodId = parseInt(this.dataset.productId); const varId = this.dataset.variantId; 
const currentProduct = daftarProduk.find(p => p.id === prodId);
const selectedVariant = currentProduct.variants.find(v => v.id_variant === varId);
if (currentProduct && selectedVariant) {
tambahKeKeranjang(currentProduct.id, selectedVariant.id_variant, `${currentProduct.nama} - ${selectedVariant.nama_variant}`, selectedVariant.harga);
this.textContent = '✓'; this.style.backgroundColor='var(--success-color)'; this.disabled = true;
setTimeout(() => { this.textContent = 'Tambah'; this.style.backgroundColor='var(--primary-color)'; this.disabled = false; }, 1500);
}
});
});
} else {
detailModal.classList.add('modal-no-variants');
const hargaDefaultElem = detailModal.querySelector('#harga-modal-default #modal-harga');
if (hargaDefaultElem && typeof produk.harga !== 'undefined') hargaDefaultElem.textContent = formatRupiah(produk.harga);
else if (hargaDefaultElem) hargaDefaultElem.textContent = "N/A"; 
if (modalBeliWhatsAppBtn) modalBeliWhatsAppBtn.dataset.id = produk.id;
if (modalTambahKeranjangBtn) modalTambahKeranjangBtn.dataset.id = produk.id;
}
detailModal.style.display = 'block'; checkAndSetBodyOverlay();
}
function tutupModalDetail() { if (detailModal) detailModal.style.display = 'none'; checkAndSetBodyOverlay(); }
if (closeModalBtn) closeModalBtn.addEventListener('click', tutupModalDetail);
if (modalBeliWhatsAppBtn) {
modalBeliWhatsAppBtn.addEventListener('click', function() {
const idProduk = parseInt(this.dataset.id);
const produk = daftarProduk.find(p => p.id === idProduk && !p.isVariantProduct && typeof p.harga !== 'undefined');
if (produk) {
let pesan = `Halo, saya tertarik memesan: ${produk.nama} (Rp ${formatRupiah(produk.harga)}). Info lanjut?`;
window.open(`https://api.whatsapp.com/send?phone=${NOMOR_WHATSAPP_TOKO}&text=${encodeURIComponent(pesan)}`, '_blank');
tutupModalDetail();
} else if (produk && typeof produk.harga === 'undefined') alert("Harga belum tersedia.");
});
}
if (modalTambahKeranjangBtn) {
modalTambahKeranjangBtn.addEventListener('click', function() {
const idProduk = parseInt(this.dataset.id);
const produk = daftarProduk.find(p => p.id === idProduk && !p.isVariantProduct && typeof p.harga !== 'undefined');
if (produk) {
tambahKeKeranjang(produk.id, null, produk.nama, produk.harga);
this.textContent = '✓ Ke Keranjang'; this.style.backgroundColor='var(--success-color)';
setTimeout(() => { this.textContent = '+ Keranjang'; this.style.backgroundColor='var(--primary-color)';}, 1500);
} else if (produk && typeof produk.harga === 'undefined') alert("Harga belum tersedia.");
});
}
if (modalCaraBayarBtn && paymentInfoPopup) {
modalCaraBayarBtn.addEventListener('click', () => { paymentInfoPopup.style.display = 'block'; checkAndSetBodyOverlay(); });
}
if (closePaymentInfoPopupBtn && paymentInfoPopup) {
closePaymentInfoPopupBtn.addEventListener('click', () => { paymentInfoPopup.style.display = 'none'; checkAndSetBodyOverlay(); });
}

window.addEventListener('click', (event) => {
let isAnyModalStillOpen = false;
const modalsToCloseOnClickOutside = [detailModal, paymentInfoPopup, tentangKamiModal, cartModal, chatAiModal];
modalsToCloseOnClickOutside.forEach(m => { if (m && event.target == m) m.style.display = 'none'; });

modalsToCloseOnClickOutside.forEach(m => { if (m && m.style.display === 'block') isAnyModalStillOpen = true; });
if (sideNav && sideNav.style.width !== "0px" && sideNav.style.width !== "") isAnyModalStillOpen = true;

if (!isAnyModalStillOpen) {
document.body.classList.remove('body-overlay-active');
if (pageOverlay) pageOverlay.classList.remove('active');
}
});

// =================== BAGIAN AI YANG DIMODIFIKASI ===================
async function handleSendChatMessage() {
    const userInput = chatAiInput.value.trim();
    if (!userInput) return;

    appendMessageToChat(userInput, 'user-message');
    chatAiInput.value = '';
    chatAiInput.style.height = 'auto';
    if (chatAiLoading) chatAiLoading.style.display = 'flex';

    // API baru tidak memerlukan histori chat atau API Key di front-end
    try {
        const encodedInput = encodeURIComponent(userInput);
        const apiUrl = `https://newapiriki.vercel.app/ai/openai?apikey=rikinew&text=${encodedInput}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Gagal mengambil data, status: ${response.status}`);
        }

        const data = await response.json();
        
        // Asumsi respons JSON memiliki kunci 'result' untuk jawaban AI
        const aiResponseText = data.result || "Maaf, saya tidak mendapat jawaban yang valid dari AI.";

        appendMessageToChat(aiResponseText, 'ai-message');

    } catch (error) {
        console.error('Error fetching AI response:', error);
        appendMessageToChat(`Terjadi kesalahan: ${error.message}. Silakan coba lagi nanti.`, 'ai-message error-message');
    } finally {
        if (chatAiLoading) chatAiLoading.style.display = 'none';
        if (chatAiMessages) chatAiMessages.scrollTop = chatAiMessages.scrollHeight;
    }
}
// =================== AKHIR BAGIAN AI YANG DIMODIFIKASI =================

function appendMessageToChat(text, className) {
if (!chatAiMessages) return;
const messageDiv = document.createElement('div');
messageDiv.classList.add('message', className);
// Ganti newline karakter (\n) dengan tag <br> untuk tampilan di HTML
const formattedText = text.replace(/\n/g, '<br>');
messageDiv.innerHTML = formattedText;
chatAiMessages.appendChild(messageDiv);
chatAiMessages.scrollTop = chatAiMessages.scrollHeight;
}


// Shopping Cart Logic
function tambahKeKeranjang(productId, variantId = null, namaLengkap, harga) {
const itemIdentifier = variantId ? `${productId}_${variantId}` : productId.toString();
const itemAda = keranjang.find(item => item.identifier === itemIdentifier);
if (itemAda) { itemAda.jumlah++; } 
else { keranjang.push({ identifier: itemIdentifier, productId, variantId, nama: namaLengkap, harga, jumlah: 1 }); }
simpanDanRenderKeranjang();
}
function kurangiJumlah(identifier) {
const itemAda = keranjang.find(item => item.identifier === identifier);
if (itemAda && itemAda.jumlah > 1) { itemAda.jumlah--; } 
else if (itemAda && itemAda.jumlah === 1) { hapusDariKeranjang(identifier); }
simpanDanRenderKeranjang();
}
function hapusDariKeranjang(identifier) {
keranjang = keranjang.filter(item => item.identifier !== identifier);
simpanDanRenderKeranjang();
}
function simpanDanRenderKeranjang() {
localStorage.setItem('tokoEstetikV9', JSON.stringify(keranjang)); renderKeranjang();
}
function renderKeranjang() {
if (!cartModalItemContainer || !cartModalTotalHarga || !cartModalCheckoutBtn || !headerCartItemCount) return;
cartModalItemContainer.innerHTML = ''; let totalHarga = 0; let jumlahTotalItem = 0;
if (keranjang.length === 0) {
cartModalItemContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
cartModalCheckoutBtn.disabled = true;
} else {
keranjang.forEach(item => {
const itemDiv = document.createElement('div'); itemDiv.classList.add('item-keranjang');
itemDiv.innerHTML = `
<span>${item.nama} (x${item.jumlah}) - Rp ${formatRupiah(item.harga * item.jumlah)}</span>
<div class="tombol-aksi-keranjang">
<button class="kurangi-item" data-identifier="${item.identifier}">-</button>
<button class="hapus-item" data-identifier="${item.identifier}">Hapus</button>
</div>`;
cartModalItemContainer.appendChild(itemDiv);
totalHarga += item.harga * item.jumlah; jumlahTotalItem += item.jumlah;
});
cartModalCheckoutBtn.disabled = false;
}
cartModalTotalHarga.textContent = formatRupiah(totalHarga);
headerCartItemCount.textContent = jumlahTotalItem;
headerCartItemCount.style.display = jumlahTotalItem > 0 ? 'inline-block' : 'none';
}
if (cartModalItemContainer) {
cartModalItemContainer.addEventListener('click', (e) => {
const target = e.target.closest('button'); if (!target) return;
const identifier = target.dataset.identifier; if (!identifier) return;
if (target.classList.contains('hapus-item')) hapusDariKeranjang(identifier);
else if (target.classList.contains('kurangi-item')) kurangiJumlah(identifier);
});
}
if (cartModalCheckoutBtn) {
cartModalCheckoutBtn.addEventListener('click', () => {
if (keranjang.length === 0) { alert('Keranjang kosong!'); return; }
let pesanPesanan = 'Halo, saya ingin memesan:\n\n'; let totalBelanja = 0;
keranjang.forEach(item => {
pesanPesanan += `- ${item.nama} (${item.jumlah}x Rp${formatRupiah(item.harga)}) = Rp${formatRupiah(item.harga*item.jumlah)}\n`;
totalBelanja += item.harga * item.jumlah;
});
pesanPesanan += `\nTotal: Rp${formatRupiah(totalBelanja)}\n\nMohon info lanjut. Thx!`;
window.open(`https://api.whatsapp.com/send?phone=${NOMOR_WHATSAPP_TOKO}&text=${encodeURIComponent(pesanPesanan)}`, '_blank');
});
}

// Initialization
if (tahunSekarangElement) tahunSekarangElement.textContent = new Date().getFullYear();
setupKategoriSlider();
renderKeranjang(); 
if (bannerSlides && bannerSlideElements.length > 0) { createBannerDots(); showBannerSlide(); startBannerInterval(); } 
else if (document.getElementById('bannerCarousel')) { document.getElementById('bannerCarousel').style.display = 'none'; }
});

document.addEventListener("DOMContentLoaded", () => {
  let jam = document.getElementById("jamDisplay");
  if (!jam) {
    jam = document.createElement("div");
    jam.id = "jamDisplay";
    document.body.appendChild(jam);
  }

  function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString("id-ID", { weekday: 'short', day: '2-digit', month: 'short' });
    jam.innerHTML = `<div>${time}</div><div style="font-size:9px">${date}</div>`;
  }

  updateTime();
  setInterval(updateTime, 1000);

  // Drag handler (halus)
  let isDragging = false;
  let offsetX = 0, offsetY = 0;

  function startDrag(x, y) {
    isDragging = true;
    offsetX = x - jam.offsetLeft;
    offsetY = y - jam.offsetTop;
  }

  function doDrag(x, y) {
    if (!isDragging) return;
    requestAnimationFrame(() => {
      jam.style.left = `${x - offsetX}px`;
      jam.style.top = `${y - offsetY}px`;
    });
  }

  function stopDrag() {
    isDragging = false;
  }

  // Mouse
  jam.addEventListener("mousedown", e => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  });

  document.addEventListener("mousemove", e => doDrag(e.clientX, e.clientY));
  document.addEventListener("mouseup", stopDrag);

  // Touch
  jam.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    e.preventDefault(); // ✅ blok scroll saat drag
    startDrag(touch.clientX, touch.clientY);
  }, { passive: false });

  document.addEventListener("touchmove", e => {
    if (!isDragging) return;
    const touch = e.touches[0];
    e.preventDefault(); // ✅ mencegah layar ikut geser
    doDrag(touch.clientX, touch.clientY);
  }, { passive: false });

  document.addEventListener("touchend", stopDrag);
});
