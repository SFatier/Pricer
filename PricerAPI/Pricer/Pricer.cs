using PricerAPI.Interpolation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PricerAPI
{
    public class Pricer : IPricer
    {
        private RateCurveLinearInterpolation r = new RateCurveLinearInterpolation();
        private RateCurveRepositoryCSV ratecurveRepository = new RateCurveRepositoryCSV(@"taux2.csv");

        //formule =  o.Coupon / Math.Pow( 1 + alpha), alpha);
        public double Compute(Obligation obligation, DateTime date) {

            var ratecurve = ratecurveRepository.GetRateCurve(date);
            double result = 0.0;
            double period = GetPeriodicite(obligation), coupon = (obligation.Nominal * obligation.Taux), nominal = obligation.Nominal, maturity = obligation.Maturity;

            double first = coupon / Math.Pow(1 + ratecurve.Curve[period], period);
            double second = 0.0;
            for (double i = period; i <= maturity; i = i + period)
            {
                second += coupon / Math.Pow(1 + r.ComputeRate(ratecurve, i), i);
            }
            double third = coupon / Math.Pow(1 + r.ComputeRate(ratecurve, maturity), maturity);
            result = first + second + third;

               return result;
        }

        private double GetPeriodicite(Obligation o)
        {
            double periodicity = 1.0;
            if (o.Periodicity == 3)
            {
                periodicity = 0.25;
            }
            else if (o.Periodicity == 6)
            {
                periodicity = 0.50;
            }
            else if (o.Periodicity == 9)
            {
                periodicity = 0.75;
            }
            return periodicity;
        }

    }
}
