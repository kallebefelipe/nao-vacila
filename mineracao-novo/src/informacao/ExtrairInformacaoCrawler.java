package informacao;

import java.io.BufferedReader;
import java.io.FileReader;

public class ExtrairInformacaoCrawler {
	
	public String executar(String textoCrawler) throws Exception {
		ExtrairInformacao extrair = new ExtrairInformacao();
		String saida = "";
		
		FileReader entrada = new FileReader(textoCrawler);
		BufferedReader lerEntrada = new BufferedReader(entrada);
		String linha = lerEntrada.readLine();
		
		while(linha != null){
			int j = 0;
			String texto = "";
			while(j < linha.length()) {
				if(linha.charAt(j) == '"' && linha.charAt(j + 1) == 't' && linha.charAt(j + 2)=='e' && linha.charAt(j + 3) == 'x' && linha.charAt(j + 4)=='t' && linha.charAt(j + 5) == 'o' && linha.charAt(j + 6)=='"') {
					j = j + 10;
					while(linha.charAt(j) != '"' || linha.charAt(j + 1) != ',' || linha.charAt(j + 2) !=' ' || linha.charAt(j + 3) != '"') {
						if(linha.charAt(j) == '\\' && linha.charAt(j + 1) == '\\' && linha.charAt(j + 2) =='r' && linha.charAt(j + 3) == '\\' && linha.charAt(j + 4) =='\\' && linha.charAt(j + 5) == 'n') {
							j = j + 6;
						}
						else if(linha.charAt(j) == '\\' && linha.charAt(j + 1) == '\\' && linha.charAt(j + 2) =='t') {
							j = j + 3;
						}
						else if(linha.charAt(j) == '\\' && linha.charAt(j + 1) == '\\' && linha.charAt(j + 2) =='n') {
							j = j + 3;
						}
						else if(linha.charAt(j) == '\\' && linha.charAt(j + 1) == '\\' && linha.charAt(j + 2) =='\'') {
							texto = texto + '\'';
							j = j + 3;
						}
						else if(linha.charAt(j) == '\\' && linha.charAt(j + 1) == '"') {
							texto = texto + '"';
							j = j + 2;
						}
						else if(linha.charAt(j) == ' ' && linha.charAt(j + 1) == ' ') {
							while(linha.charAt(j) == ' ') {
								j++;
							}
							texto = texto + ' ';
						}
						else if((linha.charAt(j) == '.' || linha.charAt(j) == '!' || linha.charAt(j) == '?' || linha.charAt(j) == ':')&& linha.charAt(j+1) == ' ') {
							texto = texto + linha.charAt(j);
							texto = texto + '\n';
							j++;
						}
						else {
							texto = texto + linha.charAt(j);
							j++;
						}
					}
					j = linha.length();
				}else {
					j++;
				}
			}
			saida += extrair.executar(texto);
			linha = lerEntrada.readLine();
			if(linha != null) {
				saida += ",\n";
			}
		}
		
		entrada.close();		
		return "[" + saida + "]"; 
	}
}
