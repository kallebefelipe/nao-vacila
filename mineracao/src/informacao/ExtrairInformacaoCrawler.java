package informacao;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.json.JSONObject;
import org.w3c.dom.Document;

public class ExtrairInformacaoCrawler {
	private int noticiasTotal = 0;
	private int noticiasMineradas = 0;
	
	public String executar(String textoCrawler) throws Exception {
		
		ExtrairTipoCrime extraiTipo = new ExtrairTipoCrime();
		ExtrairRuaCrime extraiRua = new ExtrairRuaCrime();
		ExtrairBairroCrime extraiBairro = new ExtrairBairroCrime();
		ExtrairCidadeCrime extraiCidade = new ExtrairCidadeCrime();
		
		String endereco;
		String descricao;
        double longitude;
        String id_usuario = "NOTICIA_MINERADA";
        String hora;
        String bairro;
        String id_tipo;
        double latitude;
        String titulo;
        String data;
        
        String rua;
        String cidade;
        
        int marcador;
		int j;
		String saida = "";
		
		FileReader entrada = new FileReader(textoCrawler);
		BufferedReader lerEntrada = new BufferedReader(entrada);
		String linha = lerEntrada.readLine();
		linha = lerEntrada.readLine();
		
		while(!linha.equals("]") && linha != null){
			
			noticiasTotal++;
			marcador = linha.indexOf("\"hora\"");
			hora = linha.substring(marcador + 9, marcador + 14);
			
			marcador = linha.indexOf("\"data\"");
			data = linha.substring(marcador + 9, marcador + 19);
			
			marcador = linha.indexOf("publicado em");
			j = marcador;
			j += 34;
			marcador = linha.indexOf("palavras-chave");
			String texto = "";
			while(j < marcador) {
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
			
			descricao = texto;
			
			marcador = linha.indexOf("\"titulo\"");
			j = linha.indexOf("\"}");
			titulo = linha.substring(marcador + 11, j);
			
			rua = extraiRua.executar(texto);
			bairro = extraiBairro.executar(texto);
			cidade = extraiCidade.executar(texto);
			id_tipo = extraiTipo.executar(texto);
			
			if(id_tipo.equals("homicidio")) {
				id_tipo = "6";
			}else if(id_tipo.equals("assalto")) {
				id_tipo = "1";
			}else if(id_tipo.equals("trafico")) {
				id_tipo = "7";
			}else if(id_tipo.equals("agresao")) {
				id_tipo = "8";
			}else if(id_tipo.equals("acidente")) {
				id_tipo = "10";
			}else if(id_tipo.equals("estupro")) {
				id_tipo = "9";
			}
			
			String latlong[];
			if(rua.length() > 0 && bairro.length() > 0 && cidade.length() > 0 && id_tipo.length() > 0) {
				endereco = "Rua " + rua + " - " + bairro + ", " + cidade + " - " + "PE, Brasil";
				latlong = getLatLongPositions(endereco);
				if(latlong != null) {
					latitude = Double.parseDouble(latlong[0]);
					longitude = Double.parseDouble(latlong[1]);
					enviarServidor(endereco, descricao, longitude, id_usuario, hora, bairro, id_tipo, latitude, titulo, data);
					/*System.out.println(
					endereco+
					descricao+
			        longitude+
			        id_usuario+ 
			        hora+
			        bairro+
			        id_tipo+
			        latitude+
			        titulo+
			        data);
					System.in.read();*/
				}
			}else if(rua.length() > 0 && bairro.length() == 0 && cidade.length() > 0 && id_tipo.length() > 0) {
				endereco = "Rua " + rua + ", " + cidade + " - " + "PE, Brasil";
				latlong = getLatLongPositions(endereco);
				if(latlong != null) {
					latitude = Double.parseDouble(latlong[0]);
					longitude = Double.parseDouble(latlong[1]);
					if(latlong != null) {
						latitude = Double.parseDouble(latlong[0]);
						longitude = Double.parseDouble(latlong[1]);
						enviarServidor(endereco, descricao, longitude, id_usuario, hora, bairro, id_tipo, latitude, titulo, data);
						/*System.out.println(
						endereco+
						descricao+
				        longitude+
				        id_usuario+ 
				        hora+
				        bairro+
				        id_tipo+
				        latitude+
				        titulo+
				        data);
						System.in.read();*/
					}
				}
			}
			
			linha = lerEntrada.readLine();
		}
		
		entrada.close();		
		return "[" + saida + "]"; 
	}
	
	private String[] getLatLongPositions(String address) throws Exception{
	    int responseCode = 0;
	    String api = "http://maps.googleapis.com/maps/api/geocode/xml?address=" + URLEncoder.encode(address, "UTF-8") + "&sensor=true";
	    URL url = new URL(api);
	    HttpURLConnection httpConnection = (HttpURLConnection)url.openConnection();
	    httpConnection.connect();
	    responseCode = httpConnection.getResponseCode();
	    if(responseCode == 200){
	    	DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
	    	Document document = builder.parse(httpConnection.getInputStream());
	    	XPathFactory xPathfactory = XPathFactory.newInstance();
	    	XPath xpath = xPathfactory.newXPath();
		    XPathExpression expr = xpath.compile("/GeocodeResponse/status");
		    String status = (String)expr.evaluate(document, XPathConstants.STRING);
		    if(status.equals("OK")){
		    	expr = xpath.compile("//geometry/location/lat");
		    	String latitude = (String)expr.evaluate(document, XPathConstants.STRING);
		    	expr = xpath.compile("//geometry/location/lng");
		    	String longitude = (String)expr.evaluate(document, XPathConstants.STRING);
		    	return new String[] {latitude, longitude};
		    }else{
		    	return null;
	        }
	    }
	    return null;
	}
	
	private void enviarServidor(String endereco, String	descricao, double longitude, String id_usuario, 
			String hora, String bairro, String id_tipo, double latitude, String titulo, String data) {
		
		try {			
			URL url;
			
			url = new URL("https://webserver-nao-vacila.herokuapp.com/ocorrencia_classificador/");
			
			HttpURLConnection httpCon = (HttpURLConnection) url.openConnection();
			httpCon.setDoOutput(true);
			httpCon.setDoInput(true);
			httpCon.setRequestProperty("Content-Type","application/json; charset=UTF-8");
			httpCon.setRequestMethod("POST");
			
			JSONObject ocorrencia = new JSONObject();
			
			ocorrencia.put("endereco",endereco);
		    ocorrencia.put("descricao",descricao);
		    ocorrencia.put("longitude", longitude);
		    ocorrencia.put("id_usuario", id_usuario);
		    ocorrencia.put("hora", hora);
		    ocorrencia.put("bairro", bairro);
		    ocorrencia.put("id_tipo", id_tipo);
		    ocorrencia.put("latitude", latitude);
		    ocorrencia.put("titulo", titulo);
		    ocorrencia.put("data", data);
			
			OutputStream out = httpCon.getOutputStream();
			out.write(ocorrencia.toString().getBytes("UTF-8"));
			out.flush();
			
			StringBuilder sb = new StringBuilder();  
			int HttpResult = httpCon.getResponseCode(); 
			if (HttpResult == HttpURLConnection.HTTP_OK) {
			    BufferedReader br = new BufferedReader( new InputStreamReader(httpCon.getInputStream(), "utf-8"));
			    String line = null;  
			    while ((line = br.readLine()) != null) {  
			        sb.append(line + "\n");  
			    }
			    br.close();
			    System.out.println("wallace" + sb.toString());  
			} else {
				noticiasMineradas++;
			    System.out.println(httpCon.getResponseMessage());
			    System.out.println(noticiasTotal+"-"+noticiasMineradas);
			}  
			out.close();
		
		}catch (Exception e) {
				// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}	        
}
