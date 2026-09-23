(() => {
  const config = window.CHIKY_CONFIG || {};
  const BYPASS_KEY = "chiky-maintenance-bypass";
  const path = (location.pathname || "").replace(/\\/g, "/");
  const isMaintenancePage = /mantenimiento\.html$/i.test(path);

  const hasValidPreview = () => {
    const params = new URLSearchParams(location.search);
    const key = config.maintenanceBypassKey || "";
    if (key && params.get("preview") === key) {
      try {
        sessionStorage.setItem(BYPASS_KEY, "1");
      } catch (_) {
        /* ignore */
      }
      return true;
    }
    try {
      return sessionStorage.getItem(BYPASS_KEY) === "1";
    } catch (_) {
      return false;
    }
  };

  if (config.maintenance) {
    if (isMaintenancePage) return;
    if (hasValidPreview()) return;
    location.replace("mantenimiento.html");
    return;
  }

  if (isMaintenancePage) {
    location.replace("index.html");
  }
})();
