FROM --platform=linux/amd64 node:16

LABEL com.github.actions.name="Sls mentor Action"
LABEL com.github.actions.description="Audit your serverless projects with best practices."
LABEL com.github.actions.icon="code"
LABEL com.github.actions.color="yellow"

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]