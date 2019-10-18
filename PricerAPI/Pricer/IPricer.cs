using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PricerAPI
{
    public interface IPricer
    {
        double Compute(Obligation o, DateTime date);
    }
}
