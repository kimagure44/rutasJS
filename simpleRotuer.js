window.router = (function(win, doc) {
    if ("onhashchange" in window) {
        var _configRouter = {
            supportTemplate: false,
            route: []
        };
        var _errors = {
            notSupportTemplates: "NO TIENES SOPORTE PARA TEMPLATE, USA HTML DIRECTAMENTE EN LA PROPIEDAD 'VIEW'",
            notPathConfigure: "COMPRUEBA QUE ESTÁ DEFINIA LA RUTA Y/O LA PROPIEDAD 'PATH' DENTRO DE LA CONFIGURACIÓN DE RUTAS"
        };
        var _info = {
            loadTemplate: "CARGANDO TEMPLATE",
            loadHTML: "CARGANDO HTML",
            routerOK: "DEFINIDO ROUTER DENTRO DE WINDOW"
        };

        var _setSupportTemplate = function(estado) {
            _configRouter.supportTemplate = estado;
        };
        var _loadView = function() {
            return doc.querySelector("data-route-view");
        };
        var _renderTemplate = function(template, dest) {
            var _template = doc.querySelector(template);
            var _clone = doc.importNode(_template.content, true);
            dest.appendChild(_clone);
        };

        var _render = function(type, destino, contenido) {
            if (type.toUpperCase() === "TEMPLATE") {
                console.log(_info.loadTemplate);
                _cleanRouterView();
                _renderTemplate(destino, contenido);
            }
            if (type.toUpperCase() === "HTML") {
                console.log(_info.loadHTML);
                _cleanRouterView();
                contenido.innerHTML = destino;
            }
        };

        var _cleanRouterView = function() {
            doc.querySelector("data-route-view").innerHTML = "";
        };

        var init = function(rutas) {
            debugger;
            _configRouter.route = rutas;
            win.addEventListener("hashchange", function() {
                debugger;
                var _notDefinedPath = true;
                for (_index in _configRouter.route) {
                    if (location.hash.replace("#", "/") === _configRouter.route[_index].path) {
                        _notDefinedPath = true;
                        var _view = _loadView();
                        if (_configRouter.route[_index].view.indexOf("#") >= 0) {
                            if (!_configRouter.supportTemplate) {
                                console.log(_errors.notSupportTemplates);
                                return false;
                            }
                            _render("TEMPLATE", _configRouter.route[_index].view, _view);
                        } else {
                            _render("HTML", _configRouter.route[_index].view, _view);
                        }
                        return false;
                    }
                }
                if (!_notDefinedPath) {
                    console.log(_errors.notPathConfigure);
                }
            });
            console.log(_info.routerOK);
        };
        return {
            init: function(rutas) {
                debugger;
                if ('content' in document.createElement('template')) {
                    console.log("TIENES SOPORTE PARA TEMPLATE");
                    _setSupportTemplate(true);
                } else {
                    console.log("NO TIENES SOPORTE PARA TEMPLATE");
                    _setSupportTemplate(false);
                }
                init(rutas);
            }
        }
    } else {
        console.log("NO TIENES SOPORTE PARA EL EVENTO HASHCHANGE");
    }
})(window, document);