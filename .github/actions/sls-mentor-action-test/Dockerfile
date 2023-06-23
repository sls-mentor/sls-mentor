FROM node:16

LABEL com.github.actions.name="Sls mentor Action"
LABEL com.github.actions.description="Audit your serverless projects with best practices."
LABEL com.github.actions.icon="code"
LABEL com.github.actions.color="yellow"

#COPY src /action/src
ENTRYPOINT ["/src/entrypoint.sh"]