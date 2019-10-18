using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PricerAPI.Interpolation
{
    public class RateCurveLinearInterpolation : IRateCurveInterpolation
    {
        public double ComputeRate(RateCurve rateCurve, double duree)
        {
             double d1 = 0.0, d2 = 0.0, t1 = 0.0, t2 = 0.0;
             KeyValuePair<double, double> tmp = new KeyValuePair<double, double>();
             double result = 0.0;

                  foreach (KeyValuePair<double, double> item in rateCurve.Curve)
                  {
                      if (item.Key > duree)
                      {
                          d2 = item.Key;
                          t2 = item.Value;
                          d1 = tmp.Key;
                          t1 = tmp.Value;
                          break;
                      }
                      tmp = item;

                  }
                result = (((t2 - t1) / (d2 - d1)) * duree) + t1;

            return result;
        }
    }
}
