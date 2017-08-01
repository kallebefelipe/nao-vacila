using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_noticias.Models
{
    public class NoticiaModel
    {
        public string Titulo { get; set; }
        public string Subtitulo { get; set; }
        public string Data { get; set; }
        public string Hora { get; set; }
        public string UrlNoticia { get; set; }
        public string UrlImagem { get; set; }
    }
}