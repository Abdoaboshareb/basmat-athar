document.addEventListener("DOMContentLoaded", () => {
  // ================= 1. قائمة الجوال المنسدلة (Mobile Menu) =================
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // إغلاق القائمة تلقائياً عند الضغط على أي رابط داخلها
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // ================= 2. عداد الإحصائيات المتحرك (Stats Counter) =================
  const statsSection = document.getElementById("stats-section");
  const counters = document.querySelectorAll(".counter");

  if (statsSection && counters.length > 0) {
    let hasAnimated = false;

    const animateCounters = () => {
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"), 10);
        const duration = 1200; // مدة الحركة بالملي ثانية
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentValue = Math.floor(progress * target);

          counter.textContent = currentValue;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target;
          }
        };

        requestAnimationFrame(updateCount);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsSection);
  }

  // ================= 3. تصفية المبادرات حسب التصنيف (Initiatives Filter) =================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const initiativeCards = document.querySelectorAll(".initiative-card");

  if (filterButtons.length > 0 && initiativeCards.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedFilter = btn.getAttribute("data-filter");

        // تحديث مظهر الأزرار
        filterButtons.forEach((b) => {
          b.classList.remove("bg-brand-600", "text-white", "shadow-sm");
          b.classList.add("bg-white", "text-slate-700", "border", "border-slate-200");
        });

        btn.classList.remove("bg-white", "text-slate-700", "border", "border-slate-200");
        btn.classList.add("bg-brand-600", "text-white", "shadow-sm");

        // إظهار وإخفاء البطاقات
        initiativeCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");
          if (selectedFilter === "all" || cardCategory === selectedFilter) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }

  // ================= 4. نافذة تفاصيل المبادرة (Initiative Modal) =================
  const modal = document.getElementById("initiative-modal");
  const openModalButtons = document.querySelectorAll(".open-modal-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalDoneBtn = document.getElementById("modal-done-btn");

  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalTarget = document.getElementById("modal-target");
  const modalGoal = document.getElementById("modal-goal");
  const modalOutputs = document.getElementById("modal-outputs");

  if (modal && openModalButtons.length > 0) {
    const closeModal = () => {
      modal.classList.add("hidden");
    };

    openModalButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modalTitle.textContent = button.getAttribute("data-title");
        modalCategory.textContent = button.getAttribute("data-category");
        modalTarget.textContent = button.getAttribute("data-target");
        modalGoal.textContent = button.getAttribute("data-goal");
        modalOutputs.textContent = button.getAttribute("data-outputs");

        modal.classList.remove("hidden");
      });
    });

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (modalDoneBtn) modalDoneBtn.addEventListener("click", closeModal);

    // إغلاق النافذة عند الضغط خارجها أو عند الضغط على زر Escape
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
      }
    });
  }

  // ================= 5. نموذج اقتراح مبادرة جديدة (Proposal Form) =================
  const proposalForm = document.getElementById("proposal-form");
  const proposalSuccess = document.getElementById("proposal-success");

  if (proposalForm && proposalSuccess) {
    proposalForm.addEventListener("submit", (e) => {
      e.preventDefault(); // منع إعادة تحميل الصفحة
      proposalSuccess.classList.remove("hidden");
      proposalForm.reset();

      // إخفاء رسالة التأكيد بعد 6 ثوانٍ
      setTimeout(() => {
        proposalSuccess.classList.add("hidden");
      }, 6000);
    });
  }
});