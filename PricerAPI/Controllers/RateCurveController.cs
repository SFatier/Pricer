using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PricerAPI.Interpolation;
using System.Web.Http;
using System.Net.Http;
using System.Net;

namespace PricerAPI.Controllers
{
    [Route("api/ratecurvecontroller")]
    public class RateCurveController : Controller
    {
        //IDictionary<DateTime, RateCurve> RateCurves = new Dictionary<DateTime, RateCurve>();

        [HttpGet]
        public ActionResult<string> Get()
        {
            DateTime date = new DateTime(2011, 01, 04);
            RateCurveRepositoryCSV csv = new RateCurveRepositoryCSV(@"taux2.csv");
            var str = csv.GetRateCurve(date);

            string json = JsonConvert.SerializeObject(SendCurve(str, date, 6) );
            return json;
        }

        private RateCurveDraw SendCurve(RateCurve str, DateTime date, int periodicite)
        {
            int i = 0;
            RateCurveDraw rt = new RateCurveDraw();
            var tab_maturite = str.Curve.Select(x => x.Key).ToArray();
            var tab_taux = str.Curve.Select(x => x.Value).ToArray();

            List<string> lst_maturite = new List<string>();
            List<double> lst_taux = new List<double>();

            if (periodicite == 3)
            {
                lst_maturite.Add(tab_maturite[0].ToString());
                lst_taux.Add(tab_taux[0]);
            }else  if (periodicite == 6)
            {
                lst_maturite.Add(tab_maturite[1].ToString());
                lst_taux.Add(tab_taux[1]);
                i = 1;
            }else if (periodicite == 9)
            {
                lst_maturite.Add(tab_maturite[2].ToString());
                lst_taux.Add(tab_taux[2]);
                i = 2;
            }else if(periodicite == 1)
            {
                lst_maturite.Add(tab_maturite[3].ToString());
                lst_taux.Add(tab_taux[3]);
                i = 3;
            }
           
            while( i < (str.Curve.Count() - i))
            {
                switch (periodicite)
                {
                    case 3:
                        i = i + 1;
                        break;
                    case 6:
                        i = i + 2 ;
                        break;
                    case 9:
                        i = i + 3;
                        break;
                    case 1:
                        i = i + 4;
                        break;
                }
                lst_maturite.Add(tab_maturite[i].ToString());
                lst_taux.Add(tab_taux[i]);
            }

            rt.Duree = lst_maturite.ToArray();
            rt.Date = date.ToShortDateString();
            rt.Taux = lst_taux.ToArray();

            return rt;
           
        }

        [HttpPost]
        public ActionResult<string> PostObligation([FromBody] ObligationAPI o )
        {
            var nominal = double.Parse(o.Nominal, System.Globalization.CultureInfo.InvariantCulture);
            var coupon = double.Parse(o.Coupon, System.Globalization.CultureInfo.InvariantCulture);
            var maturity = double.Parse(o.Maturity, System.Globalization.CultureInfo.InvariantCulture);
            var periodicity = double.Parse(o.Periodicity, System.Globalization.CultureInfo.InvariantCulture);
            var taux = double.Parse(o.Taux, System.Globalization.CultureInfo.InvariantCulture);

            Obligation obligation = new Obligation() { Nominal = nominal, Coupon = coupon, IssueDate = DateTime.Parse(o.IssueDate), Maturity = maturity, Periodicity = periodicity, Taux = taux };
            Pricer pricer = new Pricer();
            var result = pricer.Compute(obligation, obligation.IssueDate);
            var date = obligation.IssueDate;
            RateCurveRepositoryCSV csv = new RateCurveRepositoryCSV(@"taux2.csv");
            var str = csv.GetRateCurve(date);
            RateCurveDraw rt = SendCurve(str, date, Convert.ToInt32(o.Periodicity));
            rt.price = result;
            string json = JsonConvert.SerializeObject(rt);
            return json;
        }
    }
}