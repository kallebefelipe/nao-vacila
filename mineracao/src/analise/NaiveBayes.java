package analise;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.Normalizer;
import java.util.LinkedList;
import java.util.Scanner;

public class NaiveBayes {
	private double[][] tabelaBase;
	private double[] tabelaTexto;
	private String[] classesBase;
	private LinkedList<String> classes;
	private int contLinha;
	private int contColuna;
	
	public NaiveBayes(String texto) {
		try {
			String TXT = "data_weka_1.csv";
			Scanner entrada = new Scanner(new File(TXT));
			Scanner dado = new Scanner(new File(TXT));
			dado.nextLine();
			String linhaInicial = entrada.nextLine();
			
			int i = 0;
			int col = 0;
			while(i < linhaInicial.length()) {
				if(linhaInicial.charAt(i) == ',') {
					col++;
				}
				i++;
			}
			int lin = 0;
			while(entrada.hasNextLine()) {
				entrada.nextLine();
				lin++;
			}
			
			tabelaBase = new double[lin][col];
			classesBase = new String[lin];
			tabelaTexto = new double[col];
			classes = new LinkedList<String>();
			contLinha =lin;
			contColuna = col;
			
			texto = Normalizer.normalize(texto, Normalizer.Form.NFD);
			texto = texto.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
			texto = texto.toLowerCase();
			
			String atributo = "";
			i = 0;
			int j = 0;
			while(i < linhaInicial.length()) {
				if(linhaInicial.charAt(i) != ',')
					atributo = atributo + linhaInicial.charAt(i);
				else {
					double cont = 0;
					int indice = 0;
					
					while(indice != -1) {
						indice = texto.indexOf(atributo, indice);
						if(indice != -1) {
							cont++;
							indice = indice + atributo.length();
						}
					}
					tabelaTexto[j] = cont;
					j++;
					atributo = "";
				}
				i++;
			}
			
			String linhaDado;
			String valor;
			int l = 0;
			int c;
			while(dado.hasNextLine()) {
				linhaDado = dado.nextLine();
				j = 0;
				valor = "";
				c = 0;
				while(j < linhaDado.length()) {
					if(linhaDado.charAt(j) != ',') {
						valor = valor + linhaDado.charAt(j);
					}else {
						tabelaBase[l][c] = Double.parseDouble(valor);
						c++;
						valor = "";
					}
					j++;
				}
				classesBase[l] = valor;
				if(!classes.contains(valor))
					classes.add(valor);
				l++;
			}
			fazerTFIDF();			
			
			entrada.close();
			dado.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} 
	}
	public String executar() {
		String classificacao = "";
		int l;
		int c;
		double produtoMaior = Double.NEGATIVE_INFINITY;
		double produto;
		double soma;
		double media;
		double desvio;
		double funcao;
		double numClasse;
		String classeAtual;
		
		while(!classes.isEmpty()) {
			classeAtual = classes.remove();
			l = 0;
			soma = 0;
			produto = Math.log(1);
			while(l < contLinha) {
				if(classesBase[l].equals(classeAtual))
					++soma;
				l++;
			}
			produto += Math.log(soma/contLinha);
			numClasse = soma;
			
			for(c = 0;c < contColuna; c++) {
				soma = 0;
				for(l = 0; l < contLinha ; l++) {
					if(classesBase[l].equals(classeAtual)) {
						soma += tabelaBase[l][c]; 
					}
				}
				if(soma > 0) {
					media = soma/numClasse;
				}
				else {
					media = 0.1;
				}
				soma = 0;
				for(l = 0; l < contLinha ; l++) {
					if(classesBase[l].equals(classeAtual)) {
						soma += Math.pow((tabelaBase[l][c] - media), 2);
					}
				}
				desvio = Math.sqrt(soma/(contLinha - 1));
				if(desvio < 0.5) {
					desvio = 0.5;
				}
				//Equacao de distribuicao de probabilidade
				//System.out.println(c);
				//System.out.println(desvio + " " + media + " " + tabelaTexto[c]);
				//System.out.println(-(Math.pow(tabelaTexto[c]-media,2))/(2*Math.pow(desvio, 2)));
				funcao = (Math.pow(Math.E, -(Math.pow(tabelaTexto[c]-media,2))/(2*Math.pow(desvio, 2))))/(desvio*Math.sqrt(2*Math.PI));
				//System.out.println(Math.log(funcao));
				//System.out.println(produto);
				produto += Math.log(funcao);
				//System.out.println(produto);//-0,9801 0,0000557786
				
				/*try {
					System.in.read();
				} catch (IOException e) {
					e.printStackTrace();
				}*/
			}
			
			if(produto >= produtoMaior) {
				classificacao = classeAtual;
				produtoMaior = produto;
			}
			
			
		}
		//System.out.println(produtoMaior);
		return classificacao;
	}
	
	private void fazerTFIDF() {
		double frequencia;
		double idf;
		for(int c = 0; c < contColuna; c++) {
			frequencia = 0;
			for(int l = 0; l < contLinha; l++) {
				if(tabelaBase[l][c] > 0.0) {
					frequencia++;
				}
			}
			if(tabelaTexto[c] > 0.0) {
				frequencia++;
			}
			idf = (Math.log10((contLinha + 1)/frequencia));
			
			for(int l = 0; l < contLinha; l++) {
				tabelaBase[l][c] = tabelaBase[l][c]*idf; 
			}
			tabelaTexto[c] = tabelaTexto[c] * idf;
		}
	}
	
	/*public static void main(String[] args) {
		NaiveBayes n = new NaiveBayes("ele ja tem passagem pela policia pelo crime de trafico de drogas e tambem por homicidio publicado em 21/07/2017, as 15h43 um homem foi preso com 2kg de maconha e um revolver calibre 38 com seis municoes em um ponto de venda de drogas na avenida mustardinha, no bairro de mesmo nome, zona oeste do <START:cidadeCrime> recife <END>.\r\n" + 
				"  de acordo com a policia militar (pm), o suspeito e o proprietario da \"boca de fumo\" que foi fechada pela policia na tarde dessa quinta-feira (20).\r\n" + 
				" ele ja cumpriu pena pelo crime de trafico de drogas e tambem por homicidio.\r\n" + 
				" o suspeito foi encaminhado a delegacia, onde foi autuado por trafico de entorpecentes e posse ilegal de arma de fogo.\r\n" + 
				" palavras-chave jornal do commercio 2017 todos os direitos reservados\r\n" + 
				"");
		System.out.println(n.executar());
	}*/
}
