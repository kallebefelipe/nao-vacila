package analise;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class ConverterJPreText {
	public void executar(String CSV){
		
		try {
			FileReader entrada = new FileReader(CSV);
			BufferedReader lerEntrada = new BufferedReader(entrada);
			FileWriter saida = new FileWriter("data_weka_1.csv");
			PrintWriter escreverSaida = new PrintWriter(saida);
			String linha = lerEntrada.readLine();
			if(linha != null){
				int i = 0;
				char c = linha.charAt(i);
				while(c != ','){
					i++;
					c = linha.charAt(i);
				}
				i++;
				while(i < linha.length()){
					c = linha.charAt(i);
					escreverSaida.append(c);
					i++;
				}
				escreverSaida.append(",'Class'\n");
			}
			linha = lerEntrada.readLine();
			while(linha != null){
				int i = 0;
				char c = linha.charAt(i);
				String classe = "";
				while(c != '.'){
					classe = classe + c;
					i++;
					c = linha.charAt(i);
				}
				c = linha.charAt(i);
				while(c != ','){
					i++;
					c = linha.charAt(i);
				}
				i++;
				while(i < linha.length()){
					c = linha.charAt(i);
					escreverSaida.append(c);
					i++;
				}
				escreverSaida.append("," + classe);
				linha = lerEntrada.readLine();
				if(linha != null){
					escreverSaida.append("\n");
				}
			}
			
			entrada.close();
			saida.close();
			System.out.println("concluidojpr");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
}
