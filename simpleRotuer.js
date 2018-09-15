window.router = ((win, doc) => {
    if ("onhashchange" in window) {
        let configRouter = {
            supportTemplate: false,
            route: []
        };
        const errors = {
            notSupportTemplates: "NO TIENES SOPORTE PARA TEMPLATE, USA HTML DIRECTAMENTE EN LA PROPIEDAD 'VIEW'",
            notPathConfigure: "COMPRUEBA QUE ESTÁ DEFINIA LA RUTA Y/O LA PROPIEDAD 'PATH' DENTRO DE LA CONFIGURACIÓN DE RUTAS"
        };
        const info = {
            loadTemplate: "CARGANDO TEMPLATE",
            loadHTML: "CARGANDO HTML",
            routerOK: "DEFINIDO ROUTER DENTRO DE WINDOW"
        };
        let setSupportTemplate = estado => configRouter.supportTemplate = estado;
        let loadView = () => doc.querySelector("data-route-view");
        let renderTemplate = (template, dest) => {
            let clone = doc.importNode(doc.querySelector(template).content, true);
            dest.appendChild(clone);
        };
        let render = (type, destino, contenido) => {
            if (type.toUpperCase() === "TEMPLATE") {
                cleanRouterView();
                renderTemplate(destino, contenido);
            }
            if (type.toUpperCase() === "HTML") {
                cleanRouterView();
                contenido.innerHTML = destino;
            }
        };
        let cleanRouterView = () => doc.querySelector("data-route-view").innerHTML = "";
        let init = (rutas) => {
            configRouter.route = rutas;
            win.addEventListener("hashchange", () => {
                let _notDefinedPath = true;
                for (_index in configRouter.route) {
                    if (location.hash.replace("#", "/") === configRouter.route[_index].path) {
                        _notDefinedPath = true;
                        let _view = loadView();
                        if (configRouter.route[_index].view.indexOf("#") >= 0) {
                            if (!configRouter.supportTemplate) {
                                console.log(errors.notSupportTemplates);
                                return false;
                            }
                            render("TEMPLATE", configRouter.route[_index].view, _view);
                        } else {
                            render("HTML", configRouter.route[_index].view, _view);
                        }
                        return false;
                    }
                }
                if (!_notDefinedPath) {
                    console.log(errors.notPathConfigure);
                }
            });
            console.log(info.routerOK);
        };
        return {
            init: function (rutas) {
                if ('content' in document.createElement('template')) {
                    console.log("TIENES SOPORTE PARA TEMPLATE");
                    setSupportTemplate(true);
                } else {
                    console.log("NO TIENES SOPORTE PARA TEMPLATE");
                    setSupportTemplate(false);
                }
                init(rutas);
            }
        }
    } else {
        console.log("NO TIENES SOPORTE PARA EL EVENTO HASHCHANGE");
    }
})(window, document);
