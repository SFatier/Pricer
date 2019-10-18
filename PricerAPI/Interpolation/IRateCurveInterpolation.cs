using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PricerAPI
{
    public interface IRateCurveInterpolation
    {
        double ComputeRate(RateCurve ratecurve, double duree);
    }
}
