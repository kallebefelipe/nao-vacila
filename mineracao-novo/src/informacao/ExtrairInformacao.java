package informacao;

public class ExtrairInformacao {
	
	public String executar(String texto) throws Exception {
		String conteudoTexto = texto;
		String tipoCrime ="";
		String ruaCrime ="";
		String bairroCrime ="";
		String cidadeCrime ="";
		
		ExtrairTipoCrime extrairTipo = new ExtrairTipoCrime();
		ExtrairCidadeCrime extrairCidade = new ExtrairCidadeCrime();
		ExtrairBairroCrime  extrairBairro = new ExtrairBairroCrime();
		ExtrairRuaCrime extrairRua = new ExtrairRuaCrime();
		
		tipoCrime =  extrairTipo.executar(texto);
		cidadeCrime = extrairCidade.executar(texto);
		bairroCrime = extrairBairro.executar(texto);
		ruaCrime = extrairRua.executar(texto);
		
		return "{"+"\"conteudo\": \"" + conteudoTexto +"\", \"tipo\": \""+ tipoCrime + "\", \"rua\": \"" + ruaCrime + "\", \"bairro\": \"" + bairroCrime + "\", \"cidade\": \""+ cidadeCrime +"\"}";
	}
}
