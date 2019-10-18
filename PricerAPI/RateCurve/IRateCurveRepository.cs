using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PricerAPI
{
    public interface IRateCurveRepository
    {
        RateCurve GetRateCurve(DateTime date);
    }
}
