import React from 'react';

interface YoutubbeEmbedProps {
  embedId: string;
  width?: number;
  height?: number;
}

export const YoutubeEmbed = ({
  embedId,
  width = 850,
  height = 480,
}: YoutubbeEmbedProps): JSX.Element => (
  <iframe
    width={width}
    height={height}
    src={`https://www.youtube.com/embed/${embedId}`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube tutorial"
  />
);
