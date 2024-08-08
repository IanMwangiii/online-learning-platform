job = JobHadoopTajoQuery('JobHadoopTajoQuerySample',
                         connection_profile='CP',
                         open_query='SELECT %%firstParamName AS VAR1 \n FROM DUMMY \n ORDER BY \t VAR1 DESC')
