package informacao;

import java.io.FileInputStream;
import java.io.InputStream;

import opennlp.tools.namefind.NameFinderME;
import opennlp.tools.namefind.TokenNameFinderModel;
import opennlp.tools.tokenize.SimpleTokenizer;
import opennlp.tools.util.Span;

public class ExtrairBairroCrime {
	public String executar(String texto) throws Exception {
		SimpleTokenizer tokenizer = SimpleTokenizer.INSTANCE; 
		String tokens[] = tokenizer.tokenize(texto);
		
		InputStream modeloE = new FileInputStream("pt-ner-bairroCrime.bin");
		TokenNameFinderModel model = new TokenNameFinderModel(modeloE);
		NameFinderME nf =new NameFinderME(model);
		Span spans[] = nf.find(tokens);
		String bairros[] = Span.spansToStrings(spans, tokens);
		
		if(bairros.length > 0) {
			return bairros[0];
		}
		else {
			return "bairro não encontrado";
		}
	}
}
