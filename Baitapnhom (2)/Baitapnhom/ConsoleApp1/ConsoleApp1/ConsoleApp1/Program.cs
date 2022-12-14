using HtmlAgilityPack;
using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Linq;
using System.Threading;

namespace ConsoleApp1
{
    internal class Program
    {
        static void createJS()
        {
            StreamWriter sw = new StreamWriter("data.js");
            var js = "" + getdata(); 
            sw.WriteLine(js);
            sw.Close();
        }

        static string createConst(HtmlNode news)
        {
            HtmlWeb web = new HtmlWeb();
            var txt = "";

            var news_title = news.SelectSingleNode(".//h3[@class='title-news']/a")
                .Attributes["title"]
                .Value;
            var news_description = news.SelectSingleNode(".//p[@class='description']/a")
                .LastChild
                .InnerText;
            var href = news.SelectSingleNode(".//p[@class='description']/a")
                .Attributes["href"]
                .Value.ToString();
         
            txt += "'" + news_title.Replace("'","\"") +
                "','" + news_description.Replace("'", "\"") +
                "','" + href +"'";
            return txt;          
        }

        static string getdata()
        {
            HtmlWeb web = new HtmlWeb();

            var htmlDoc = web.Load("https://vnexpress.net/tin-tuc-24h");

            var news_list = htmlDoc.DocumentNode
                .SelectNodes("//article[@class='item-news item-news-common']");
            var Cnst = "const news = [\r\n";
            //var index = 1;
            var count = 1;
            foreach (var news in news_list)
            {               
                if (count % 6 > 0)
                {
                    Cnst += "[";
                    createConst(news);
                    Cnst += createConst(news) + "],\r\n";
                    //index++;
                }
                count++;
            }
            return Cnst + "];";
        }

        static string getFirstUrl()
        {
            HtmlWeb web = new HtmlWeb();

            var htmlDoc = web.Load("https://vnexpress.net/tin-tuc-24h");
            var firstUrl = htmlDoc.DocumentNode
                .SelectSingleNode("//article[@class='item-news item-news-common']/h3/a")
                .Attributes["href"]
                .Value.ToString(); ;
            return firstUrl;
        }

        static void updateNews()
        {
            Thread Update = new Thread(() => {
                string currentFirslUrl = getFirstUrl();
                while (true)
                {
                    if (!(String.Compare(currentFirslUrl,getFirstUrl(),true) == 0))
                    {
                        currentFirslUrl = getFirstUrl();
                        createJS();
                        Console.WriteLine("Có tin tức mới");
                    }       
                }
            });
            Update.Start();
        }

        static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.UTF8;
            Console.InputEncoding = Encoding.UTF8;

            createJS();
            updateNews();

            Process process = new Process();
            process.StartInfo = new ProcessStartInfo("index.html") {
                UseShellExecute = true
            };
            process.Start();
        }
    }
}
