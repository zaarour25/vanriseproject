using System.Web;
using System.Web.Optimization;

namespace vanriseProject
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
    "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new Bundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/ui-bootstrap").Include(
                "~/Scripts/angular-ui/ui-bootstrap.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                "~/Scripts/angular-ui/ui-bootstrap.min.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js"));

            bundles.Add(new StyleBundle("~/bundles/angularBootstrap").Include(
                "~/Content/ui-bootstrap-csp.css",
                "~/Content/bootstrap.min.css"
            ));

            bundles.Add(new ScriptBundle("~/bundles/MyApp").Include(
                "~/MyApp/app.js"));


            bundles.Add(new ScriptBundle("~/bundles/ClientScript").Include(
               "~/MyApp/ClientScript.js"));

            bundles.Add(new ScriptBundle("~/bundles/PhoneScript").Include(
               "~/MyApp/PhoneNumberScript.js"));

            bundles.Add(new ScriptBundle("~/bundles/PhoneReserveScript").Include(
               "~/MyApp/PhoneReserve.js"));

            bundles.Add(new ScriptBundle("~/bundles/LogINScript").Include(
               "~/MyApp/LogINScript.js"));






















        }
    }
}
