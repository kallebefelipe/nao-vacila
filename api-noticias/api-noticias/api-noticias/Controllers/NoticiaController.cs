using api_noticias.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HtmlAgilityPack;

namespace api_noticias.Controllers
{
    public class NoticiaController : ApiController
    {

        public IList<NoticiaModel> Get()
        {
            List<NoticiaModel> noticias = new List<NoticiaModel>();
            string url = "http://jconline.ne10.uol.com.br/canal/cidades/policia";

            HtmlWeb web = new HtmlWeb();

            HtmlDocument document = web.Load(url);
            List <HtmlNode> listaNoticias = document.GetElementbyId("divResultadoAjax").ChildNodes.Where(x => x.Name == "ul").ToList();

            listaNoticias.Remove(listaNoticias[listaNoticias.Count()-1]);
            foreach (var dia in listaNoticias)
            {
                var diaFilhos = dia.ChildNodes.Where(x => x.Name == "li").ToList();
                var data = diaFilhos.First().InnerHtml;
                diaFilhos.RemoveAt(0);
                foreach (var hora in diaFilhos)
                {
                    var HH  = hora.ChildNodes[1].InnerHtml.Replace("\r", "").Replace("\n", "").Trim();
                    var titulo = hora.ChildNodes[3].InnerHtml.Replace("\r", "").Replace("\n", "").Trim();
                    var urlNoticia = hora.ChildNodes[3].Attributes["href"].Value;

                    document = web.Load(urlNoticia);
                    var docNoticia = document.GetElementbyId("noticia");
                    var subtitulo = docNoticia.ChildNodes.Where(x => x.Name == "p").First().InnerHtml;
                    var urlImagem = docNoticia.ChildNodes.Where(x => x.Name == "img").First().Attributes["src"].Value;

                    NoticiaModel noticia = new NoticiaModel();
                    noticia.Titulo = titulo;
                    noticia.Hora = HH;
                    noticia.Data = data;
                    noticia.UrlNoticia = urlNoticia;
                    noticia.Subtitulo = subtitulo;
                    noticia.UrlImagem = urlImagem;
                    noticias.Add(noticia);
                }
                
            }

            return noticias;
        }
    }
}
