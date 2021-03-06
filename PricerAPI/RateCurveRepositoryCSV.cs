﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
namespace PricerAPI
{
    public class RateCurveRepositoryCSV : IRateCurveRepository
    {

        IDictionary<DateTime, RateCurve> RateCurves = new Dictionary<DateTime, RateCurve>();

        public RateCurveRepositoryCSV(string path)
        {
            int j = 0;
            string[] lines = System.IO.File.ReadAllLines(path);

            //recuperation des différentes 
            //var allDuree = lines[0].Split(';').Skip(1).ToList();
            List<Double> allDuree = new List<double>(){0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5,
            5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75, 9, 9.25, 9.5, 9.75, 10, 10.25, 10.5, 10.75, 11, 11.25, 11.5, 11.75, 12,
            12.25, 12.5, 12.75, 13, 13.25, 13.5, 13.75, 14, 14.25, 14.5, 14.75, 15, 15.25, 15.5, 15.75, 16, 16.25, 16.5, 16.75, 17, 17.25, 17.5, 17.75, 18, 18.25, 18.5, 18.75, 19,
            19.25, 19.5, 19.75, 20, 20.25, 20.5, 20.75, 21, 21.25, 21.5, 21.75, 22, 22.25, 22.5, 22.75, 23, 23.25, 23.5, 23.75, 24, 24.25, 24.5, 24.75, 25, 25.25, 25.5, 25.75, 26,
            26.25, 26.5, 26.75, 27, 27.25, 27.5, 27.75, 28, 28.25, 28.5, 28.75, 29, 29.25, 29.5, 29.75, 30};

        var allDates = lines.Select(l => l.Split(';').First()).Skip(1).ToList(); //récupération des différentes dates
            var values = lines.Select(l => new { date = l.Split(';').First(), Values = l.Split(';').Skip(1).ToArray() }).Skip(1).ToList(); //récuperation des valeurs ainsi que les dates associées

            //boucle sur les lignes du csv
            for (int i = 0; i < (lines.Length - 1); i++)
            {
                IDictionary<double, double> curve = new Dictionary<double, double>(); 
                RateCurve r = null;
                j = 0;
                DateTime date = Convert.ToDateTime(allDates[i]);
                //boucle sur les différentes valeurs a ajoutées dans le curve
                while (j < (values[i].Values.Length -1))
                {
                    //string duree = allDuree[j].Trim(new char[] { ' ','Z', 'C', 'Y', 'R' });
                    //double db = Convert.ToDouble(duree);
                    double value = 0.0;

                    if (values[i].Values[j] !=  " na"&& values[i].Values[j] != " ")
                    {
                        value = double.Parse(values[i].Values[j], CultureInfo.InvariantCulture);
                    }
                    curve.Add(allDuree[j],  value);
                    j++;
                }
                r = new RateCurve(date, curve);
                RateCurves.Add(Convert.ToDateTime(allDates[i]), r);
            }
        }


        public RateCurve GetRateCurve(DateTime date)
        {
            if (!RateCurves.ContainsKey(date))
                return null;

            return RateCurves[date];
        }
    }
}


