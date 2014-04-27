function getArticleData(source)
{		
	$('#hiddenInput').attr('value', source.id);	
	$('#hiddenForm').submit();
}