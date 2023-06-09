FROM node:14

LABEL com.github.actions.name="SLS mentor Action"
LABEL com.github.actions.description="Automated audit of your AWS stack"
LABEL com.github.actions.icon="code"
LABEL com.github.actions.color="orange"
COPY src /action/src
ENTRYPOINT ["/action/src/entrypoint.sh"]