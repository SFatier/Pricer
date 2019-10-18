using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PricerAPI
{

    public class ObligationAPI
    {
        public string Nominal { get; set; }
        public string Periodicity { get; set; }
        public string Taux { get; set; }
        public string Coupon { get; set; }
        public string IssueDate { get; set; }
        public string Maturity { get; set; }
        
    }

    public class Obligation
    {
        public double Nominal { get; set; }
        public double Periodicity { get; set; }
        public double Taux { get; set; }
        public double Coupon { get; set; }
        public DateTime IssueDate { get; set; }
        public double Maturity { get; set; }
    }
}
