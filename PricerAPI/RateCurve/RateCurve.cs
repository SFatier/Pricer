using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PricerAPI
{
    public struct RateCurveDraw
    {
        public string[]  Duree;
        public string     Date;
        public double[] Taux;
        public double    price;
    };

    public class RateCurve
    {
        public RateCurve(DateTime valudityDate, IDictionary<double,double> curve )
        {
            ValidityDate = valudityDate;
            Curve = curve;
        }
        public IDictionary<double, double> Curve { get; }

        public DateTime ValidityDate { get; }

    }
}
