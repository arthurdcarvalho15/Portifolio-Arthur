
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. CARROSSEL DE PROJETOS
    // =====================================

    const listaProjetos = document.querySelector("#listaProjetos");

    document.querySelector("#anterior")?.addEventListener("click", () => {
        listaProjetos?.scrollBy({
            left: -260,
            behavior: "smooth"
        });
    });

    document.querySelector("#proximo")?.addEventListener("click", () => {
        listaProjetos?.scrollBy({
            left: 260,
            behavior: "smooth"
        });
    });


    // =====================================
    // 2. EXPANDIR E RECOLHER SEÇÕES
    // =====================================

    document.querySelectorAll("section:not(.habilidades) > .titulo-secao").forEach(titulo => {

        titulo.addEventListener("click", () => {
            titulo.parentElement.classList.toggle("fechada");
        });

    });


    // =====================================
    // 3. NAVBAR E MENU MOBILE
    // =====================================

    const botaoMenu = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-links");

    function fecharMenu() {
        menu?.classList.remove("aberto");

        botaoMenu?.setAttribute("aria-expanded", "false");
        botaoMenu?.setAttribute("aria-label", "Abrir menu");
    }

    botaoMenu?.addEventListener("click", () => {

        const aberto = menu?.classList.toggle("aberto") ?? false;

        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );

    });

    document.querySelectorAll('.navbar a[href^="#"]').forEach(link => {

        link.addEventListener("click", evento => {

            const id = link.getAttribute("href");
            const destino = document.querySelector(id);

            if (!destino) return;

            evento.preventDefault();

            destino.classList.remove("fechada");

            fecharMenu();

            const alturaNavbar =
                document.querySelector(".cabecalho")?.offsetHeight ?? 0;

            const posicao =
                destino.getBoundingClientRect().top +
                window.scrollY -
                alturaNavbar;

            window.scrollTo({
                top: Math.max(0, posicao),
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth"
            });

        });

    });

    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape") fecharMenu();
    });


    // =====================================
    // 4. ANIMAÇÃO DURANTE O SCROLL
    // =====================================

    const secoes = document.querySelectorAll(
        ".perfil, .projetos, .contatos"
    );

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(entradas => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observador.unobserve(entrada.target);
                }

            });

        }, {
            threshold: 0.1
        });

        secoes.forEach(secao => {
            secao.classList.add("animar-scroll");
            observador.observe(secao);
        });

    }

});
