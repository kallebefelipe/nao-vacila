package informacao;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.*;
import java.net.URLConnection;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;
import javax.xml.xpath.XPathConstants;
import org.w3c.dom.Document;

public class Teste {
	public static void main(String[] args) {
		ExtrairInformacaoCrawler exc = new ExtrairInformacaoCrawler();
		try {
			System.out.println(exc.executar("data.txt"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		/*URL url;
		try {
			url = new URL("https://webserver-nao-vacila.herokuapp.com/ocorrencia/");
		
		HttpURLConnection httpCon = (HttpURLConnection) url.openConnection();
		httpCon.setDoOutput(true);
		httpCon.setDoInput(true);
		httpCon.setRequestProperty("Content-Type","application/json; charset=UTF-8");
		httpCon.setRequestMethod("POST");
		
		
		JSONObject ocorrencia = new JSONObject();
		
			ocorrencia.put("endereco","Rua maria augusta vila chan");
	        ocorrencia.put("descricao","roubo");
	        ocorrencia.put("longitude", -34.8286451);
	        ocorrencia.put("id_usuario", "1361193977302590");
	        ocorrencia.put("hora", "20:05");
	        ocorrencia.put("bairro", "curado");
	        ocorrencia.put("id_tipo", "1");
	        ocorrencia.put("latitude", -7.9443001);
	        ocorrencia.put("titulo", "roubo");
	        ocorrencia.put("data", "02/08/2017");
		
		OutputStream out = httpCon.getOutputStream();
		out.write(ocorrencia.toString().getBytes("UTF-8"));
		
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
		    System.out.println(httpCon.getResponseMessage());  
		}  
		out.close();
		}catch (Exception e) {
				// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		
		
		/*BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
	    System.out.println("Please enter a location:");
	    String postcode;
	    String latLongs[];
		try {
			postcode = reader.readLine();
			latLongs = getLatLongPositions(postcode);
			System.out.println("Latitude: "+latLongs[0]+" and Longitude: "+latLongs[1]);
		} catch (Exception e) {
			e.printStackTrace();
		}*/
	    
	}
	
	 public static String[] getLatLongPositions(String address) throws Exception
	  {
	    int responseCode = 0;
	    String api = "http://maps.googleapis.com/maps/api/geocode/xml?address=" + URLEncoder.encode(address, "UTF-8") + "&sensor=true";
	    URL url = new URL(api);
	    HttpURLConnection httpConnection = (HttpURLConnection)url.openConnection();
	    httpConnection.connect();
	    responseCode = httpConnection.getResponseCode();
	    if(responseCode == 200)
	    {
	      DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
	      Document document = builder.parse(httpConnection.getInputStream());
	      XPathFactory xPathfactory = XPathFactory.newInstance();
	      XPath xpath = xPathfactory.newXPath();
	      XPathExpression expr = xpath.compile("/GeocodeResponse/status");
	      String status = (String)expr.evaluate(document, XPathConstants.STRING);
	      if(status.equals("OK"))
	      {
	         expr = xpath.compile("//geometry/location/lat");
	         String latitude = (String)expr.evaluate(document, XPathConstants.STRING);
	         expr = xpath.compile("//geometry/location/lng");
	         String longitude = (String)expr.evaluate(document, XPathConstants.STRING);
	         return new String[] {latitude, longitude};
	      }
	      else
	      {
	         throw new Exception("Error from the API - response status: "+status);
	      }
	    }
	    return null;
	  }
}
